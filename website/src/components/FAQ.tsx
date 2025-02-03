import { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';

// Component of the FAQ
export const FAQ: FC = () => {
  const { t } = useTranslation();

  const faqItems = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1'),
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2'),
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3'),
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4'),
    },
  ];

  return (
    <section className="bg-slate-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold text-cyan-900 sm:text-4xl">
          {t('faq.title')}
        </h2>
        <p className="mt-4 text-lg text-slate-600">{t('faq.description')}</p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

const FAQItem: FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-lg font-medium text-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
      >
        <span>{question}</span>
        <span
          className={`ml-4 transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } transition-transform duration-300`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-max-height mt-4 text-slate-600 duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};
