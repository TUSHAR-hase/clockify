export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} NextTail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

