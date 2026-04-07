import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, cart, subtotal, discount, total } = body;
    const paymentLink = process.env.PAYMENT_LINK || '#';
    const senderEmail = process.env.SENDER_EMAIL_ID || 'orders@yourcustomdomain.com';

    // Validate inputs
    if (!formData || !cart || cart.length === 0) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // Insert into Supabase
    const supabase = await createClient();
    
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
        subtotal: subtotal,
        discount: discount,
        total_amount: total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Supabase Order Error:', orderError);
      return NextResponse.json({ error: 'Failed to create order in database' }, { status: 500 });
    }

    // Insert order items
    const orderItems = cart.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Supabase Order Items Error:', itemsError);
      // Proceed to email even if items failed, or handle failure
    }

    // Compose HTML email
    const orderItemsHtml = cart.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4CAF50; text-align: center;">Order Confirmed!</h2>
        <p>Dear ${formData.fullName},</p>
        <p>Thank you for placing your order with us. Your order ID is <strong>#${orderData.id.slice(0, 8).toUpperCase()}</strong>.</p>
        
        <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
              <td style="padding: 10px; text-align: right;">₹${subtotal.toFixed(2)}</td>
            </tr>
            ${discount > 0 ? `
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #d9534f;">Discount:</td>
              <td style="padding: 10px; text-align: right; color: #d9534f;">-₹${discount.toFixed(2)}</td>
            </tr>
            ` : ''}
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">₹${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <p style="margin-bottom: 15px; font-weight: bold;">Please complete your payment using the link below:</p>
          <a href="${paymentLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Complete Payment</a>
        </div>

        <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Shipping Information</h3>
        <p>
          ${formData.address}<br>
          ${formData.city}, ${formData.state} ${formData.zipCode}<br>
          ${formData.country}
        </p>

        <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
          If you have any questions, please reply to this email or contact our support.
        </p>
      </div>
    `;

    // Send Email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Believe Pharma <${senderEmail}>`,
      to: [formData.email],
      subject: `Order Confirmation - Believe Pharma`,
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      orderId: orderData.id,
      emailId: emailData?.id
    });
    
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
