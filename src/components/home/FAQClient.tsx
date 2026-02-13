'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQClientProps {
    faqs: { question: string; answer: string }[];
}

export function FAQClient({ faqs }: FAQClientProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white border-primary/20 shadow-lg' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                >
                    <button
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                    >
                        <span className="font-bold text-lg text-gray-900 pr-8">{faq.question}</span>
                        {openIndex === index ? (
                            <FaChevronUp className="text-[#C5A059] transition-transform flex-shrink-0" />
                        ) : (
                            <FaChevronDown className="text-gray-400 transition-transform flex-shrink-0" />
                        )}
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
