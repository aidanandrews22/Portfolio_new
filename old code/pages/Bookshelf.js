import React from 'react';

const BookItem = ({ title, author, link, image, description }) => (
  <div className="mb-8">
    <div className="flex items-start mb-4">
      {image && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="mr-4">
          <img src={image} alt={title} className="w-32 h-auto" />
        </a>
      )}
      <div>
        <h3 className="text-xl font-semibold">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary">{title}</a>
        </h3>
        <p className="text-lg">By {author}</p>
      </div>
    </div>
    {description && <p className="text-gray-700">{description}</p>}
  </div>
);

const BookList = ({ title, books }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    {books.map((book, index) => (
      <BookItem key={index} {...book} />
    ))}
  </section>
);

const Bookshelf = () => {
  const topBooks = [
    {
      title: "Outliers: The Story Success",
      author: "Malcolm Gladwell",
      link: "https://www.amazon.com/Outliers-Story-Success-Malcolm-Gladwell/dp/0316017930",
      image: "/assets/book1.jpg",
      description: "Exploring what it means to be successful in a world that rewards hard work and luck. Gladwell discusses the factors that contribute to a high-level of success. Gladwell proposes that personal achievements are not solely caused by an individual traits such as hard-work and intelligence. Rather, success is often molded by external factors such as family, culture, and idiosyncratic opportunities that individuals encounter by chance. One thing that stuck with me from this book was the 10,000 hour rule, Gladwell claims that to achieve word-class expertise in any field an individual must spend around 10,000 hours on their skills. However, he also mentions that external factors such as timing, culture, upbringing, and even birthdates significantly affect an individuals success potential.",
      category: "Personal Development"
    },
    {
      title: "Mathematics for Machine Learning",
      author: "Marc Peter Deisenroth",
      link: "https://www.amazon.com/Mathematics-Machine-Learning-Peter-Deisenroth/dp/1108470041",
      image: "/assets/book2.jpg",
      description: "This textbook teaches complex mathematics with a hyperfocus on machine-learning. Usually the math taught in this book is dispersed between an array of classes, but this book teaches them in a succinct and concise manner so the reader is only introduced to topics specifically needed to understand machine-learning. Deisenroth introduces you to the fundamental mathematical tools needed to understand machine-learning; this includes linear algebra, analytic geometry, matrix decomposition, vector calc, optimization, probability and statistics. Overall, it is a pretty complex and heavy book but is great for anyone with a mathematical background and an interest in its application in machine-learning. This book is also published by The Cambridge University Press, take that as you will.",
      category: "Computer Science"
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      link: "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X",
      image: "/assets/book3.jpg",
      description: "This book is one of those that you read and end up citing it hundreds of times a week in conversation. A lot of the practices of my life have been directly altered because I read this book. I would say other factors contributed to me altering the patterns of my life however, this book provided me with anecdotes and case studies that support my actions. Duhigg provides evidence and stories that support his theory that habitual tendencies significantly impact your life and inadvertently your success. After reading this book I realized habits are much more nuanced than I thought, like eating. Definitely recommend this book to anyone trying to shake a bad habit, build new habits, or learn about what habits are and how deeply they influence your decisions.",
      category: "Personal Development"
    }
  ];

  const honorableMentions = [
    { title: "Bobby Fischer Teaches Chess", author: "Bobby Fischer", link: "https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153/ref=zg_bs_g_4406_d_sccl_2/139-9165052-2731300?psc=1", category: "Sports" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", link: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555", category: "Psychology" },
    { title: "How to Win Friends & Influence People", author: "Dale Carnegie", link: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034", category: "Personal Development" }
  ];

  const allBooks = [
    { title: "Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications", author: "Chip Huyen", link: "https://www.amazon.com/dp/1098107969?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Computer Science" },
    { title: "Deep Learning (Adaptive Computation and Machine Learning series)", author: "Ian Goodfellow", link: "https://www.amazon.com/gp/product/0262035618/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1", category: "Computer Science" },
    { title: "Pattern Recognition and Machine Learning (Information Science and Statistics)", author: "Christopher M. Bishop", link: "https://www.amazon.com/gp/product/0387310738/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1", category: "Computer Science" },
    { title: "A Brief History of Intelligence: Evolution, AI, and the Five Breakthroughs That Made Our Brains", author: "Max Bennett", link: "https://www.amazon.com/dp/0063286343?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
    { title: "The Self-Assembling Brain: How Neural Networks Grow Smarter", author: "Peter Robin Hiesinger", link: "https://www.amazon.com/dp/0691181225?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
    { title: "The Chess Bible - From First Move to Checkmate", author: "Seshat Academy", link: "https://www.amazon.com/Chess-Bible-Checkmate-Become-Workbook/dp/B0CL31746D/ref=zg_bs_g_4406_d_sccl_9/139-9165052-2731300?psc=1", category: "Sports" },
    { title: "Machine Learning for Absolute Beginners", author: "Python for Data Science, Book 3", link: "https://example.com/machine_learning_beginners", category: "Computer Science" },
    { title: "Python Crash Course, 3rd Edition", author: "Eric Matthes", link: "https://example.com/python_crash_course", category: "Computer Science" },
    { title: "Java Precisely, third edition", author: "Peter Sestoft", link: "https://example.com/java_precisely", category: "Computer Science" },
    { title: "C++ Primer, 5th Edition", author: "Stanley Lippman", link: "https://example.com/cplusplus_primer", category: "Computer Science" },
    { title: "Deep Learning for Coders with Fastai and PyTorch", author: "Jeremy Howard", link: "https://example.com/deep_learning_fastai_pytorch", category: "Computer Science" },
    { title: "Head First Design Patterns", author: "Eric Freeman, Elisabeth Robson", link: "https://example.com/head_first_design_patterns", category: "Computer Science" },
    { title: "Consciousness Explained", author: "Daniel C. Dennett", link: "https://www.amazon.com/dp/0316180653?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Philosophy" },
    { title: "A Brief History of Artificial Intelligence", author: "What It Is, Where We Are, and Where We Are Going", link: "https://example.com/a_brief_history_of_ai", category: "Computer Science" },
    { title: "DotCom Secrets", author: "The Underground Playbook for Growing Your Company Online", link: "https://example.com/dotcom_secrets", category: "Business" },
    { title: "The Art of Doing Science and Engineering: Learning to Learn", author: "Richard W. Hamming", link: "https://www.amazon.com/dp/1732265178?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
    { title: "Why We Sleep: Unlocking the Power of Sleep and Dreams", author: "Matthew Walker", link: "https://www.amazon.com/dp/1501144324?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Science" },
    { title: "Retire by 30", author: "Frank Niu", link: "https://example.com/retire_by_30", category: "Personal Finance" },
    { title: "Atomic Habits", author: "James Clear", link: "https://example.com/atomic_habits", category: "Personal Development" },
    { title: "Can't Hurt Me", author: "David Goggins", link: "https://example.com/cant_hurt_me", category: "Personal Development" },
    { title: "The Daily Laws", author: "Robert Greene", link: "https://example.com/the_daily_laws", category: "Personal Development" },
    { title: "The Mountain Is You", author: "Brianna Wiest", link: "https://example.com/the_mountain_is_you", category: "Personal Development" },
    { title: "12 Rules for Life: An Antidote to Chaos", author: "Jordan B. Peterson", link: "https://example.com/12_rules_for_life", category: "Personal Development" },
    { title: "The Power of Positive Thinking", author: "Dr. Norman Vincent Peale", link: "https://example.com/the_power_of_positive_thinking", category: "Personal Development" },
    { title: "Never Split the Difference", author: "Chris Voss", link: "https://example.com/never_split_the_difference", category: "Business" },
    { title: "Scarcity Brain", author: "Michael Easter", link: "https://example.com/scarcity_brain", category: "Psychology" },
    { title: "Outlive: The Science and Art of Longevity", author: "No Author Listed", link: "https://example.com/outlive", category: "Health" },
    { title: "David and Goliath", author: "Malcolm Gladwell", link: "https://example.com/david_and_goliath", category: "Psychology" },
    { title: "One Up on Wall Street", author: "Peter Lynch", link: "https://example.com/one_up_on_wall_street", category: "Personal Finance" },
    { title: "Rich Dad, Poor Dad", author: "Robert T. Kiyosaki", link: "https://example.com/rich_dad_poor_dad", category: "Personal Finance" },
    { title: "Risk: A User's Guide", author: "General Stanley McChrystal", link: "https://example.com/risk_users_guide", category: "Business" },
    { title: "A Beginner's Guide to the Stock Market", author: "Matthew R. Kratter", link: "https://example.com/beginners_guide_stock_market", category: "Personal Finance" },
    { title: "How to Day Trade for a Living", author: "Andrew Aziz", link: "https://example.com/how_to_day_trade", category: "Personal Finance" },
    { title: "Tax-Free Wealth", author: "Tom Wheelwright", link: "https://example.com/tax_free_wealth", category: "Personal Finance" },
    { title: "1984", author: "George Orwell", link: "https://www.amazon.com/dp/0451524934?psc=1&ref=ppx_yo2ov_dt_b_product_details", category: "Fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", link: "https://example.com/to_kill_a_mockingbird", category: "Fiction" },
    { title: "The Catcher in the Rye", author: "J. D. Salinger", link: "https://example.com/the_catcher_in_the_rye", category: "Fiction" },
    { title: "The Alchemist: 25th Anniversary Edition", author: "Paulo Coelho", link: "https://example.com/the_alchemist", category: "Fiction" },
    { title: "Go Tell It on the Mountain", author: "James Baldwin", link: "https://example.com/go_tell_it_on_the_mountain", category: "Fiction" },
    { title: "No Longer Human", author: "Osamu Dazai", link: "https://example.com/no_longer_human", category: "Fiction" },
    { title: "The Outsiders", author: "S. E. Hinton", link: "https://example.com/the_outsiders", category: "Fiction" },
    { title: "Jesus Calling", author: "Sarah Young", link: "https://example.com/jesus_calling", category: "Religion" },
    { title: "The Sports Gene", author: "David Epstein", link: "https://example.com/sports_gene", category: "Sports" },
    { title: "Hockey Tough", author: "Saul L. Miller", link: "https://example.com/hockey_tough", category: "Sports" },
    { title: "Snowden: The Only Safe Place is On the Run", author: "Kieran Fitzgerald", link: "https://example.com/snowden", category: "Biography" }
  ];

  // Group books by category
  const booksByCategory = allBooks.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = [];
    }
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto">
      <BookList title="Top 3 Books" books={topBooks} />
      <BookList title="Honorable Mentions" books={honorableMentions} />
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">All Books (by subject)</h2>
        {Object.entries(booksByCategory).map(([category, books]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            {books.map((book, index) => (
              <BookItem key={index} {...book} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Bookshelf;