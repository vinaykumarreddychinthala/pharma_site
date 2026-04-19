import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Lock, Eye, Database, Mail, Globe, UserCheck, Trash2 } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - Believe Pharma',
  description: 'Learn how Believe Pharma collects, uses, and protects your personal information when you use our website and services.',
}

const sections = [
  {
    icon: Database,
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'When you place an order, create an account, or contact us, we may collect: your full name, email address, phone number, shipping and billing address, and payment details (processed securely via Stripe — we never store raw card data).',
      },
      {
        subtitle: 'Order & Transaction Data',
        text: 'We store records of your purchases, order history, selected products, dosage preferences, and shipping information to fulfill your orders and improve our service.',
      },
      {
        subtitle: 'Usage & Technical Data',
        text: 'We automatically collect certain information when you visit our site, including your IP address, browser type, device information, pages visited, referring URLs, and session timestamps. This data is used solely for analytics and site improvement.',
      },
      {
        subtitle: 'Communications',
        text: 'If you contact us via email or our contact form, we retain those messages to respond to your inquiry and improve our customer support.',
      },
    ],
  },
  {
    icon: Eye,
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'Order Fulfillment',
        text: 'We use your name, address, and contact details to process, ship, and confirm your orders. Order confirmation and shipping notifications are sent to the email address you provide.',
      },
      {
        subtitle: 'Payment Processing',
        text: 'Payment information is handled exclusively through Stripe, a PCI-DSS compliant payment processor. Believe Pharma does not store, log, or have direct access to your full card details.',
      },
      {
        subtitle: 'Customer Service',
        text: 'Your contact information and order history allow our support team to assist you effectively with questions, returns, or any concerns about your order.',
      },
      {
        subtitle: 'Communications & Updates',
        text: 'With your consent, we may send you order updates, promotional offers, or health & wellness information. You can opt out of marketing emails at any time by clicking "Unsubscribe" in any email or by contacting us directly.',
      },
      {
        subtitle: 'Site Improvement',
        text: 'Aggregated, anonymized usage data helps us understand how customers navigate our site so we can improve product discovery, checkout flow, and overall experience.',
      },
    ],
  },
  {
    icon: Lock,
    title: '3. Discretion & Confidentiality',
    content: [
      {
        subtitle: 'Discreet Packaging',
        text: 'All orders are shipped in plain, neutral packaging with no reference to Believe Pharma or product contents on the outside. Your privacy extends to every aspect of your purchase experience.',
      },
      {
        subtitle: 'Billing Descriptor',
        text: 'Charges on your billing statement will appear under a neutral descriptor that does not disclose the nature of the products purchased.',
      },
      {
        subtitle: 'Staff Confidentiality',
        text: 'Our team members are bound by strict confidentiality obligations. Your personal information and purchase history are never discussed or shared inappropriately.',
      },
    ],
  },
  {
    icon: Globe,
    title: '4. Sharing of Information',
    content: [
      {
        subtitle: 'Third-Party Service Providers',
        text: 'We share limited data with trusted third parties who assist in operating our business — including Stripe (payment processing), shipping carriers (for order delivery), and our hosting infrastructure provider. These parties are contractually required to protect your data.',
      },
      {
        subtitle: 'No Sale of Personal Data',
        text: 'We do not sell, rent, or trade your personal information to any third parties for their own marketing purposes. Ever.',
      },
      {
        subtitle: 'Legal Compliance',
        text: 'We may disclose your information if required by law, court order, or governmental authority, or to protect the rights, safety, and property of Believe Pharma, our customers, or others.',
      },
    ],
  },
  {
    icon: Shield,
    title: '5. Data Security',
    content: [
      {
        subtitle: 'Encryption',
        text: 'Our website uses HTTPS/TLS encryption for all data transmitted between your browser and our servers. Sensitive data is encrypted both in transit and at rest.',
      },
      {
        subtitle: 'Secure Infrastructure',
        text: 'Our databases and backend infrastructure are hosted on secure, access-controlled environments. We implement industry-standard security practices including regular audits and access logging.',
      },
      {
        subtitle: 'Payment Security',
        text: 'All payment data is handled by Stripe, which maintains PCI-DSS Level 1 compliance — the highest standard for payment security. We are never exposed to your full card number.',
      },
      {
        subtitle: 'Limitations',
        text: 'While we take every reasonable measure to protect your data, no method of electronic transmission or storage is 100% secure. In the unlikely event of a breach, we will notify affected users as required by applicable law.',
      },
    ],
  },
  {
    icon: UserCheck,
    title: '6. Your Rights & Choices',
    content: [
      {
        subtitle: 'Access & Correction',
        text: 'You have the right to access the personal information we hold about you and to request corrections if it is inaccurate or incomplete. Please contact us at support@believepharma.com to make such a request.',
      },
      {
        subtitle: 'Data Deletion',
        text: 'You may request deletion of your personal data at any time, subject to legal retention requirements. We will fulfill deletion requests within 30 days of verification.',
      },
      {
        subtitle: 'Marketing Opt-Out',
        text: 'You can opt out of receiving marketing emails at any time by clicking the "Unsubscribe" link in any marketing email or by contacting us directly. Transactional emails related to your orders will continue.',
      },
      {
        subtitle: 'Cookies',
        text: 'Our site may use cookies for session management and analytics. You can configure your browser to refuse cookies, though some features of the site may not function correctly as a result.',
      },
    ],
  },
  {
    icon: Trash2,
    title: '7. Data Retention',
    content: [
      {
        subtitle: 'Order Records',
        text: 'We retain order and transaction records for a minimum of 7 years to comply with applicable tax and financial regulations.',
      },
      {
        subtitle: 'Account Data',
        text: 'If you have an account, your profile information is retained for as long as your account remains active. You may request account deletion at any time.',
      },
      {
        subtitle: 'Anonymized Analytics',
        text: 'Aggregated, anonymized data that cannot be linked to any individual may be retained indefinitely to support business analysis and site improvements.',
      },
    ],
  },
  {
    icon: Mail,
    title: '8. Contact Us',
    content: [
      {
        subtitle: 'Privacy Questions',
        text: 'If you have any questions, concerns, or requests related to this Privacy Policy or how we handle your personal information, please contact us at:',
      },
      {
        subtitle: 'Email',
        text: 'support@believepharma.com',
      },
      {
        subtitle: 'Phone',
        text: '+1 (800) 123-4567',
      },
      {
        subtitle: 'Mailing Address',
        text: 'Believe Pharma\n123 Health Street\nMedical City, MC 12345\nUnited States',
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-28 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -mr-32 -mt-32 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl -ml-32 -mb-32 mix-blend-screen" />
          <div className="relative max-w-4xl mx-auto px-4 z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-md rounded-full text-primary-foreground/80 font-medium tracking-wider text-sm mb-6 uppercase">
              <Shield className="h-4 w-4" />
              Your Privacy Matters
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-primary-foreground mb-6 tracking-tight drop-shadow-sm">
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed">
              At Believe Pharma, we are committed to protecting your personal information and ensuring your experience with us remains discreet, secure, and trustworthy.
            </p>
            <p className="mt-6 text-sm text-primary-foreground/70">
              Last updated: April 19, 2026
            </p>
          </div>
        </section>

        {/* Intro Card */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 border border-primary/20 rounded-3xl p-10 shadow-sm">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                This Privacy Policy describes how <strong className="text-foreground">Believe Pharma</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, stores, and protects personal information you provide when using our website (<strong className="text-foreground">believepharma.com</strong>) and purchasing our products.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                By visiting our site or placing an order, you agree to the terms described in this policy. We encourage you to read it in full. If you have questions, please reach out to us at{' '}
                <a href="mailto:support@believepharma.com" className="text-primary font-semibold hover:underline">
                  support@believepharma.com
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="pb-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {sections.map((section, idx) => {
              const Icon = section.icon
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
                  </div>

                  {/* Subsections */}
                  <div className="space-y-6">
                    {section.content.map((item, i) => (
                      <div key={i} className="pl-4 border-l-2 border-primary/20 hover:border-primary/60 transition-colors">
                        <h3 className="font-bold text-foreground mb-1">{item.subtitle}</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Lock className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
              Your Trust is Our Foundation
            </h2>
            <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8">
              We handle every order and every piece of personal data with the utmost care and discretion. Questions? Our team is here to help.
            </p>
            <a
              href="mailto:support@believepharma.com"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold px-8 py-3 rounded-full hover:bg-primary-foreground/90 transition-colors"
            >
              <Mail className="h-5 w-5" />
              Contact Our Privacy Team
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
