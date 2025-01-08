
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NoToDo</h3>
            <p className="text-sm">We are dedicated to helping you manage your tasks efficiently.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#hero" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="#feature" className="hover:text-gray-300">Features</Link></li>
              <li><Link href="#operation-flow" className="hover:text-gray-300">How It Work</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>Email Address：<span className='whitespace-nowrap'>echoedinvoker@gmail.com</span></li>
              <li>Phone Number：<span className='whitespace-nowrap'>(123) 1234-5678</span></li>
              <li>Address: No. 7, Section 5, Xinyi Road, Xinyi District, Taipei City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} NoToDo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
