import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-wide text-white">
          QuizMe
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/"
            className="rounded-lg border border-white/10 px-4 py-2 text-gray-200 transition-colors hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            to="/"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
