import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import FilterDropdown from '../components/FilterDropdown';

interface Book {
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  review?: string;
  dateRead?: string;
  link?: string;
  category: string;
  image?: string;
  description?: string;
}

const books: Book[] = [
  // Top Books (rating: 5)
  {
    title: "Outliers: The Story Success",
    author: "Malcolm Gladwell",
    link: "https://www.amazon.com/Outliers-Story-Success-Malcolm-Gladwell/dp/0316017930",
    image: "/assets/Book/book1.jpg",
    description: "Exploring what it means to be successful in a world that rewards hard work and luck. Gladwell discusses the factors that contribute to a high-level of success. Gladwell proposes that personal achievements are not solely caused by an individual traits such as hard-work and intelligence. Rather, success is often molded by external factors such as family, culture, and idiosyncratic opportunities that individuals encounter by chance. One thing that stuck with me from this book was the 10,000 hour rule, Gladwell claims that to achieve word-class expertise in any field an individual must spend around 10,000 hours on their skills. However, he also mentions that external factors such as timing, culture, upbringing, and even birthdates significantly affect an individuals success potential.",
    category: "Personal Development",
    rating: 5,
    dateRead: "2023-06-15"
  },
  {
    title: "Mathematics for Machine Learning",
    author: "Marc Peter Deisenroth",
    link: "https://www.amazon.com/Mathematics-Machine-Learning-Peter-Deisenroth/dp/1108470041",
    image: "/assets/Book/book2.jpg",
    description: "This textbook teaches complex mathematics with a hyperfocus on machine-learning. Usually the math taught in this book is dispersed between an array of classes, but this book teaches them in a succinct and concise manner so the reader is only introduced to topics specifically needed to understand machine-learning. Deisenroth introduces you to the fundamental mathematical tools needed to understand machine-learning; this includes linear algebra, analytic geometry, matrix decomposition, vector calc, optimization, probability and statistics.",
    category: "Computer Science",
    rating: 5,
    dateRead: "2024-08-01"
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    link: "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X",
    image: "/assets/Book/book3.jpg",
    description: "This book is one of those that you read and end up citing it hundreds of times a week in conversation. A lot of the practices of my life have been directly altered because I read this book. I would say other factors contributed to me altering the patterns of my life however, this book provided me with anecdotes and case studies that support my actions.",
    category: "Personal Development",
    rating: 5,
    dateRead: "2024-11-15"
  },

  // Honorable Mentions (rating: 4)
  {
    title: "Bobby Fischer Teaches Chess",
    author: "Bobby Fischer",
    link: "https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153/ref=zg_bs_g_4406_d_sccl_2/139-9165052-2731300?psc=1",
    category: "Sports",
    rating: 4,
    dateRead: "2024-12-20"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    link: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555",
    category: "Psychology",
    rating: 4,
    dateRead: "2024-04-25"
  },
  {
    title: "How to Win Friends & Influence People",
    author: "Dale Carnegie",
    link: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034",
    category: "Personal Development",
    rating: 4,
    dateRead: "2023-11-30"
  },

  // Rest of the books (no rating)
  { title: "Meditations", author: "Marcus Aurelius", link: "https://www.amazon.com/Meditations-New-Translation-Marcus-Aurelius/dp/0812968255", category: "Philosophy", description: "The personal writings of the Roman Emperor Marcus Aurelius, offering timeless wisdom on life, leadership, and personal growth.", rating: 4, dateRead: "2025-01-29"},
  { title: "Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications", author: "Chip Huyen", link: "https://www.amazon.com/dp/1098107969?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Computer Science" },
  { title: "Deep Learning (Adaptive Computation and Machine Learning series)", author: "Ian Goodfellow", link: "https://www.amazon.com/gp/product/0262035618/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1", category: "Computer Science" },
  { title: "Pattern Recognition and Machine Learning (Information Science and Statistics)", author: "Christopher M. Bishop", link: "https://www.amazon.com/gp/product/0387310738/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1", category: "Computer Science" },
  { title: "A Brief History of Intelligence: Evolution, AI, and the Five Breakthroughs That Made Our Brains", author: "Max Bennett", link: "https://www.amazon.com/dp/0063286343?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
  { title: "The Self-Assembling Brain: How Neural Networks Grow Smarter", author: "Peter Robin Hiesinger", link: "https://www.amazon.com/dp/0691181225?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
  { title: "The Chess Bible - From First Move to Checkmate", author: "Seshat Academy", link: "https://www.amazon.com/Chess-Bible-Checkmate-Become-Workbook/dp/B0CL31746D/ref=zg_bs_g_4406_d_sccl_9/139-9165052-2731300?psc=1", category: "Sports" },
  { title: "Machine Learning for Absolute Beginners", author: "Python for Data Science, Book 3", link: "https://www.amazon.com/Machine-Learning-Absolute-Beginners-Introduction/dp/B0BT4YBZQC/", category: "Computer Science" },
  { title: "Python Crash Course, 3rd Edition", author: "Eric Matthes", link: "https://www.amazon.com/Python-Crash-Course-Eric-Matthes/dp/1718502702/", category: "Computer Science" },
  { title: "Java Precisely, third edition", author: "Peter Sestoft", link: "https://www.amazon.com/Java-Precisely-Press-Peter-Sestoft/dp/0262529076/", category: "Computer Science" },
  { title: "C++ Primer, 5th Edition", author: "Stanley Lippman", link: "https://www.amazon.com/Primer-5th-Stanley-B-Lippman/dp/0321714113/", category: "Computer Science" },
  { title: "Deep Learning for Coders with Fastai and PyTorch", author: "Jeremy Howard", link: "https://www.amazon.com/Deep-Learning-Coders-fastai-PyTorch/dp/1492045527/", category: "Computer Science" },
  { title: "Head First Design Patterns", author: "Eric Freeman, Elisabeth Robson", link: "https://www.amazon.com/Head-First-Design-Patterns-Object-Oriented/dp/149207800X/", category: "Computer Science" },
  { title: "Consciousness Explained", author: "Daniel C. Dennett", link: "https://www.amazon.com/dp/0316180653?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Philosophy" },
  { title: "A Brief History of Artificial Intelligence", author: "Michael Wooldridge", link: "https://www.amazon.com/Brief-History-Artificial-Intelligence-Intelligent/dp/125059803X/", category: "Computer Science" },
  { title: "DotCom Secrets", author: "Russell Brunson", link: "https://www.amazon.com/DotCom-Secrets-Underground-Playbook-Growing/dp/1401960464/", category: "Business" },
  { title: "The Art of Doing Science and Engineering: Learning to Learn", author: "Richard W. Hamming", link: "https://www.amazon.com/dp/1732265178?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
  { title: "Why We Sleep: Unlocking the Power of Sleep and Dreams", author: "Matthew Walker", link: "https://www.amazon.com/dp/1501144324?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
  { title: "Retire by 30", author: "Frank Niu", link: "https://example.com/retire_by_30", category: "Personal Finance" },
  { title: "Atomic Habits", author: "James Clear", link: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/", category: "Personal Development" },
  { title: "Can't Hurt Me", author: "David Goggins", link: "https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512287/", category: "Personal Development" },
  { title: "The Daily Laws", author: "Robert Greene", link: "https://www.amazon.com/Daily-Laws-366-Meditations-Power/dp/0593299213/", category: "Personal Development" },
  { title: "The Mountain Is You", author: "Brianna Wiest", link: "https://www.amazon.com/Mountain-You-Transforming-Self-Sabotage-Self-Mastery/dp/1949759229/", category: "Personal Development" },
  { title: "12 Rules for Life: An Antidote to Chaos", author: "Jordan B. Peterson", link: "https://www.amazon.com/12-Rules-Life-Antidote-Chaos/dp/0345816021/", category: "Personal Development" },
  { title: "The Power of Positive Thinking", author: "Dr. Norman Vincent Peale", link: "https://www.amazon.com/Power-Positive-Thinking-Norman-Vincent/dp/0743234804/", category: "Personal Development" },
  { title: "Never Split the Difference", author: "Chris Voss", link: "https://www.amazon.com/Never-Split-Difference-Negotiating-Depended/dp/0062407805/", category: "Business" },
  { title: "Scarcity Brain", author: "Michael Easter", link: "https://www.amazon.com/Scarcity-Brain-Science-Having-Enough/dp/0593185935/", category: "Psychology" },
  { title: "Outlive: The Science and Art of Longevity", author: "Peter Attia", link: "https://www.amazon.com/Outlive-Longevity-Peter-Attia-MD/dp/0593236599/", category: "Health" },
  { title: "David and Goliath", author: "Malcolm Gladwell", link: "https://www.amazon.com/David-Goliath-Underdogs-Misfits-Battling/dp/0316204374/", category: "Psychology" },
  { title: "Flowers for Algernon", author: "Daniel Keyes", link: "https://www.amazon.com/Flowers-Algernon-Daniel-Keyes/dp/015603008X", category: "Fiction", description: "A powerful exploration of intelligence, humanity, and the ethical implications of scientific advancement through the story of Charlie Gordon." },
  { title: "Tuesdays with Morrie", author: "Mitch Albom", link: "https://www.amazon.com/Tuesdays-Morrie-Greatest-Life-Lessons/dp/076790592X", category: "Philosophy", description: "A memoir that chronicles the time spent with a dying professor sharing life's greatest lessons." },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", link: "https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/0807014273", category: "Philosophy", description: "A profound exploration of life's meaning through the lens of Frankl's experiences in Nazi concentration camps." },
  { title: "The Science of Being Great", author: "Wallace D. Wattles", link: "https://www.amazon.com/Science-Being-Great-Wallace-Wattles/dp/1630890081?sr=1-1", category: "Personal Development", description: "A guide to developing personal power and unlocking one's potential for greatness." },
  { title: "The Richest Man in Babylon", author: "George S. Clason", link: "https://www.amazon.com/Richest-Man-Babylon-George-Clason/dp/1505339111", category: "Personal Finance", description: "Ancient Babylonian parables offering timeless financial wisdom and money management principles." },
  { title: "One Up on Wall Street", author: "Peter Lynch", link: "https://www.amazon.com/One-Up-Wall-Street-Already/dp/0743200403/", category: "Personal Finance" },
  { title: "Rich Dad, Poor Dad", author: "Robert T. Kiyosaki", link: "https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194/", category: "Personal Finance" },
  { title: "Risk: A User's Guide", author: "General Stanley McChrystal", link: "https://www.amazon.com/Risk-Users-Guide-Stanley-McChrystal/dp/0593192206/", category: "Business" },
  { title: "A Beginner's Guide to the Stock Market", author: "Matthew R. Kratter", link: "https://www.amazon.com/Beginners-Guide-Stock-Market-Everything/dp/1099617200/", category: "Personal Finance" },
  { title: "How to Day Trade for a Living", author: "Andrew Aziz", link: "https://www.amazon.com/How-Day-Trade-Living-Management/dp/1535585951/", category: "Personal Finance" },
  { title: "Tax-Free Wealth", author: "Tom Wheelwright", link: "https://www.amazon.com/Tax-Free-Wealth-Permanently-Lowering-Advisors/dp/1937832058/", category: "Personal Finance" },
  { title: "1984", author: "George Orwell", link: "https://www.amazon.com/dp/0451524934?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Fiction" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", link: "https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0446310786/", category: "Fiction" },
  { title: "The Catcher in the Rye", author: "J. D. Salinger", link: "https://www.amazon.com/Catcher-Rye-J-D-Salinger/dp/0316769487/", category: "Fiction" },
  { title: "The Alchemist", author: "Paulo Coelho", link: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005/", category: "Fiction" },
  { title: "Go Tell It on the Mountain", author: "James Baldwin", link: "https://www.amazon.com/Tell-Mountain-Vintage-International-Baldwin/dp/0375701877/", category: "Fiction" },
  { title: "No Longer Human", author: "Osamu Dazai", link: "https://www.amazon.com/No-Longer-Human-Osamu-Dazai/dp/0811204812/", category: "Fiction" },
  { title: "The Outsiders", author: "S. E. Hinton", link: "https://www.amazon.com/Outsiders-S-Hinton/dp/014240733X/", category: "Fiction" },
  { title: "Jesus Calling", author: "Sarah Young", link: "https://www.amazon.com/Jesus-Calling-Enjoying-Peace-Presence/dp/1591451884/", category: "Religion" },
  { title: "The Sports Gene", author: "David Epstein", link: "https://www.amazon.com/Sports-Gene-Science-Extraordinary-Athletic/dp/161723012X/", category: "Sports" },
  { title: "Hockey Tough", author: "Saul L. Miller", link: "https://www.amazon.com/Hockey-Tough-Saul-L-Miller/dp/1492504092?sr=1-1", category: "Sports" },
  { title: "Snowden: The Only Safe Place is On the Run", author: "Kieran Fitzgerald", link: "https://www.amazon.com/Snowden-Official-Motion-Picture-Screenplay/dp/1510719652?sr=1-1", category: "Biography" },
];

export default function Bookshelf() {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(books.map(book => book.category)));
    return uniqueCategories.sort();
  }, []);

  // Filter books by category
  const filteredBooks = useMemo(() => {
    if (!selectedCategory) return books;
    return books.filter(book => book.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 p-4"
    >
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">My Bookshelf</h1>
          <FilterDropdown
            options={categories}
            selectedOption={selectedCategory}
            onSelect={setSelectedCategory}
            label="Category"
          />
        </div>
        <p className="text-lg">
          A curated collection of books that have shaped my thinking and learning journey.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredBooks.map((book, index) => (
          <motion.article
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-4">
                {book.image && (
                  <img
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    className="w-16 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{book.title}</h2>
                  <p className="text-sm text-[color-mix(in_oklch,var(--color-primary)_70%,transparent)]">{book.author}</p>
                  <p className="text-xs mt-1">{book.category}</p>
                </div>
              </div>
              {typeof book.rating === 'number' && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < book.rating!
                          ? 'text-[var(--color-primary)]'
                          : 'text-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>

            {book.description && (
              <blockquote className="my-4 text-sm italic">
                "{book.description}"
              </blockquote>
            )}

            <div className="flex justify-between items-center mt-4 text-sm">
              {book.dateRead && (
                <time dateTime={book.dateRead}>
                  Read: {new Date(book.dateRead).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </time>
              )}
              {book.link && (
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  View Book →
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}