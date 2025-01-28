import { motion } from 'framer-motion';

interface Book {
  title: string;
  author: string;
  coverUrl?: string;
  rating: number;
  review?: string;
  dateRead: string;
  link?: string;
}

const books: Book[] = [
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    rating: 5,
    dateRead: "2023-12-01",
    review: "A must-read for any software developer. Full of practical advice and timeless principles.",
    link: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 5,
    dateRead: "2023-11-15",
    review: "Fundamentally changed how I think about writing code. The principles are language-agnostic and invaluable.",
    link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
  },
  // Add more books as needed
];

export default function Bookshelf() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">My Bookshelf</h1>
        <p className="text-lg">
          A curated collection of books that have influenced my thinking and approach to software development.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {books.map((book, index) => (
          <motion.article
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-sm">{book.author}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < book.rating
                        ? 'text-[var(--color-primary)]'
                        : 'text-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {book.review && (
              <blockquote className="my-4 text-sm italic">
                "{book.review}"
              </blockquote>
            )}

            <div className="flex justify-between items-center mt-4 text-sm">
              <time dateTime={book.dateRead}>
                Read: {new Date(book.dateRead).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </time>
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