export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Essential Vitamins for Boosting Immunity This Winter',
    excerpt: 'Discover the most important vitamins and minerals your body needs to fight off seasonal colds and stay healthy during the winter months.',
    content: `
As winter approaches, our immune systems are put to the test. Cold weather itself doesn't make you sick, but it drives people indoors, where viruses spread more easily. A robust immune system is your best defense against seasonal sniffles and the flu. In this comprehensive guide, we'll explore the ten essential vitamins and minerals that can naturally boost your immunity and keep you healthy throughout the colder months.

**1. Vitamin C: The Immune System MVP**
Perhaps the most well-known immunity booster, Vitamin C acts as a powerful antioxidant. It helps stimulate the production of white blood cells, which are vital for fighting off infections. Citrus fruits, strawberries, bell peppers, and spinach are excellent natural sources. For a concentrated boost, consider a high-quality Vitamin C supplement.

**2. Vitamin D: The Sunshine Vitamin**
During winter trims, our exposure to sunlight plummets, making Vitamin D deficiency common. This crucial vitamin helps regulate the immune system and has been shown to reduce the risk of respiratory infections. Fatty fish, fortified dairy products, and direct supplements can bridge the gap.

**3. Zinc: The Infection Fighter**
Zinc is essential for immune cell function and signaling. Even mild zinc deficiency can impair immune function. Studies suggest that zinc lozenges can reduce the duration of a cold by up to a day. Oysters, beef, lentils, and pumpkin seeds are rich in this critical mineral.

**4. Vitamin A: The Defender**
Often associated with vision, Vitamin A is also essential for maintaining the health of your skin and tissues in your mouth, stomach, intestines, and respiratory system, which are the first lines of defense against infection. Sweet potatoes, carrots, and dark green leafy vegetables are great sources.

**5. Vitamin E: The Bodyguard**
Another vital antioxidant, Vitamin E protects your cells from oxidative stress. It is crucial for the optimal functioning of the immune system, particularly in older adults. Nuts, seeds, and spinach are packed with Vitamin E.

Incorporating these key nutrients into your daily routine, whether through a balanced diet or targeted supplements, can significantly enhance your body's natural defenses. Always consult with a healthcare professional before starting any new supplement regimen.
    `,
    date: 'Oct 15, 2025',
    author: 'Dr. Sarah Jenkins',
    category: 'Wellness'
  },
  {
    id: '2',
    title: 'Understanding Generic vs. Brand Name Medications',
    excerpt: 'Are generic medicines really as effective as their brand-name counterparts? We break down the science and dispel common myths.',
    content: `
The debate between generic and brand-name medications is a common source of confusion for many patients. When your doctor writes a prescription, you might wonder if paying extra for the brand name is truly worth it, or if the generic alternative is just as good. In this article, we break down the facts, the science, and the regulatory standards to clear up common misconceptions.

**What Are Generic Medications?**
A generic drug is a medication created to be the same as an existing approved brand-name drug in dosage form, safety, strength, route of administration, quality, and performance characteristics. In essence, it works the same way and provides the same clinical benefit as its brand-name counterpart.

**The FDA's Strict Standards**
The U.S. Food and Drug Administration (FDA) requires generic drugs to meet the same strict quality and safety standards as brand-name drugs. Before a generic drug can be approved, the manufacturer must prove that it is bioequivalent to the brand-name drug. This means the active ingredient must be absorbed in the body at the same rate and extent.

**Why Are Generics Cheaper?**
The main reason generic drugs cost less is because their manufacturers do not have to repeat the animal and clinical (human) studies that were required of the brand-name medicines to demonstrate safety and effectiveness. Also, competition among multiple generic manufacturers typically drives prices down.

**Are There Any Differences?**
While the active ingredients must be identical, the inactive ingredients (such as flavors, preservatives, and coloring) can vary. In very rare cases, a patient might be allergic to an inactive ingredient in a generic formulation, though this is uncommon.

Ultimately, generic medications provide a safe, effective, and cost-efficient alternative to brand-name drugs. Always talk to your pharmacist or healthcare provider if you have specific concerns about switching to a generic prescription.
    `,
    date: 'Sep 28, 2025',
    author: 'Pharmacist David Lee',
    category: 'Education'
  },
  {
    id: '3',
    title: 'Managing Stress: How Mind and Body Connect',
    excerpt: 'Learn about the physical impacts of chronic stress and practical ways to manage it for better long-term health outcomes.',
    content: `
In today's fast-paced world, stress is often viewed as an unavoidable part of life. While brief moments of stress can be motivating, chronic stress can have profound, long-lasting effects on your physical and mental health. Understanding the intricate connection between the mind and body is the first step toward effective stress management.

**The Physical Toll of Stress**
When you experience stress, your body’s “fight or flight” response kicks in, releasing a surge of hormones, including cortisol and adrenaline. Over time, elevated levels of these hormones can lead to a host of physical issues:
- **Cardiovascular Problems:** Increased heart rate and elevated blood pressure can contribute to heart disease over time.
- **Digestive Issues:** Stress can affect your gut, leading to conditions like IBS, acid reflux, or ulcers.
- **Weakened Immunity:** Chronic stress suppresses the immune system, making you more susceptible to infections and illnesses.

**The Importance of Mindfulness**
Mindfulness and meditation are powerful tools for managing stress. By bringing your attention to the present moment, you can break the cycle of anxious thoughts and trigger your body's relaxation response. Even five minutes of deep, focused breathing can lower your heart rate and reduce cortisol levels.

**Actionable Stress Management Techniques**
1. **Regular Exercise:** Physical activity is one of the most effective stress relievers. It releases endorphins, which act as natural mood lifters.
2. **Adequate Sleep:** Lack of sleep exacerbates stress. Aim for 7-9 hours of quality sleep per night.
3. **Healthy Diet:** Nourishing your body with whole foods can improve your resilience against stress.
4. **Establish Boundaries:** Learning to say no and establishing a healthy work-life balance are critical for long-term well-being.

Managing stress is not a one-time fix but a continuous practice. By integrating these strategies into your daily routine, you can foster a healthier mind-body connection and significantly improve your overall quality of life.
    `,
    date: 'Sep 10, 2025',
    author: 'Dr. Emily Chen',
    category: 'Mental Health'
  },
  {
    id: '4',
    title: 'The Truth About Over-the-Counter Pain Relievers',
    excerpt: 'When to choose aspirin, ibuprofen, or paracetamol for your symptoms to ensure fast and safe recovery.',
    content: `
Walking down the pain relief aisle at your local pharmacy can be an overwhelming experience. With dozens of colorful boxes promising fast relief, how do you know which over-the-counter (OTC) medication is right for your specific symptoms? In this guide, we simplify the choices, focusing on the three most common OTC pain relievers.

**Paracetamol (Acetaminophen)**
Paracetamol is a staple in most medicine cabinets. It is highly effective for reducing fever and alleviating mild to moderate pain, such as headaches and mild toothaches. However, it is not an anti-inflammatory, meaning it won't help much with swelling or inflammation caused by injuries or arthritis. It is generally gentle on the stomach, making it a good choice for those with sensitive digestive issues, but it should be avoided if you have liver conditions or consume alcohol heavily.

**Ibuprofen**
Ibuprofen belongs to a class of drugs called nonsteroidal anti-inflammatory drugs (NSAIDs). It is excellent for treating pain that involves inflammation, such as muscle sprains, menstrual cramps, and arthritis. It is also effective at lowering fevers. Because NSAIDs can irritate the stomach lining, it’s best taken with food. Individuals with kidney issues or high blood pressure should consult a doctor before long-term use.

**Aspirin**
Also an NSAID, aspirin is one of the oldest pain relievers available. It effectively treats headaches, minor body aches, and fever. More notably, low-dose aspirin is often prescribed to help prevent heart attacks and strokes due to its blood-thinning properties. However, aspirin should never be given to children or teenagers recovering from viral infections due to the risk of a rare but serious condition called Reye's syndrome.

**Safety First**
While OTC pain relievers are generally safe when used correctly, they are not without risks. Always follow the recommended dosage instructions on the package. Taking more than the recommended dose won't necessarily relieve your pain faster but will significantly increase your risk of dangerous side effects. When in doubt, consult your pharmacist for personalized advice.
    `,
    date: 'Aug 22, 2025',
    author: 'Dr. John Miller',
    category: 'Education'
  }
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}
