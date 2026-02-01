export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
}

export const financeQuestions: Question[] = [
  {
    id: 1,
    question: "What is inflation?",
    answers: [
      "When interest rates go up",
      "When prices of goods and services decrease over time",
      "When the government prints more money",
      "When prices of goods and services increase over time",
    ],
    correctAnswer: 3,
    explanation: "Inflation is when the general level of prices for goods and services rises, reducing the purchasing power of money over time."
  },
  {
    id: 2,
    question: "What is a budget?",
    answers: [
      "A plan for how to spend your money",
      "The amount of money you earn",
      "A type of bank account",
      "A loan from the government"
    ],
    correctAnswer: 0,
    explanation: "A budget is a plan that shows how much money you have and how you'll spend it on different expenses."
  },
  {
    id: 3,
    question: "What are tariffs?",
    answers: [
      "Taxes on imported goods from other countries",
      "Fees for using public transportation",
      "Monthly bills for utilities",
      "Interest charges on credit cards"
    ],
    correctAnswer: 0,
    explanation: "Tariffs are taxes that governments place on goods imported from other countries to protect local businesses or generate revenue."
  },
  {
    id: 4,
    question: "What is compound interest?",
    answers: [
      "Interest earned on your principal plus previously earned interest",
      "Interest that is only calculated once",
      "Interest that decreases over time",
      "Interest you pay on a loan"
    ],
    correctAnswer: 0,
    explanation: "Compound interest is when you earn interest on your money, and then that interest earns interest too - it's like earning interest on interest!"
  },
  {
    id: 5,
    question: "What is a stock?",
    answers: [
      "A share of ownership in a company",
      "A supply of goods in a store",
      "A type of soup",
      "Money saved in a bank"
    ],
    correctAnswer: 0,
    explanation: "A stock is a piece of ownership in a company. When you buy stocks, you become a partial owner and can benefit if the company does well."
  },
  {
    id: 6,
    question: "What is a credit score?",
    answers: [
      "A number that shows how creditworthy you are",
      "The amount of money in your bank account",
      "Your annual salary",
      "The interest rate on your loan"
    ],
    correctAnswer: 0,
    explanation: "A credit score is a number (usually 300-850) that tells lenders how likely you are to pay back borrowed money."
  },
  {
    id: 7,
    question: "What is an investment?",
    answers: [
      "Money you put into something hoping it will grow over time",
      "Money you spend on everyday items",
      "Money you give to charity",
      "Money the government gives you"
    ],
    correctAnswer: 0,
    explanation: "An investment is when you use your money to buy something (like stocks, bonds, or real estate) that you hope will increase in value."
  },
  {
    id: 8,
    question: "What is a debit card?",
    answers: [
      "A card that takes money directly from your bank account",
      "A card that lets you borrow money",
      "A card that gives you discounts",
      "A card issued by the government"
    ],
    correctAnswer: 0,
    explanation: "A debit card is linked to your bank account and lets you spend money you already have, unlike a credit card which you have to pay back later."
  },
  {
    id: 9,
    question: "What is a recession?",
    answers: [
      "A period when the economy shrinks and people earn less",
      "When the government raises taxes",
      "When all businesses close",
      "When the stock market goes up"
    ],
    correctAnswer: 0,
    explanation: "A recession is when economic growth slows down, people lose jobs, and spending decreases for several months or years."
  },
  {
    id: 10,
    question: "What does it mean to save money?",
    answers: [
      "To set money aside instead of spending it",
      "To borrow money from a bank",
      "To invest in the stock market",
      "To donate money to charity"
    ],
    correctAnswer: 0,
    explanation: "Saving money means putting money away for the future instead of spending it right now, usually in a bank account."
  },
  {
    id: 11,
    question: "What is interest?",
    answers: [
      "Money earned on savings or paid on borrowed money",
      "A tax on income",
      "A fee for using a credit card",
      "Money paid to employees"
    ],
    correctAnswer: 0,
    explanation: "Interest is the cost of borrowing money, or the amount you earn on your savings. Banks pay you interest on savings accounts."
  },
  {
    id: 12,
    question: "What is a loan?",
    answers: [
      "Money borrowed that you must pay back with interest",
      "A gift of money from the government",
      "Money earned from working",
      "A discount on a purchase"
    ],
    correctAnswer: 0,
    explanation: "A loan is money borrowed from a bank or lender that you agree to pay back over time, usually with interest."
  },
  {
    id: 13,
    question: "What is tax?",
    answers: [
      "Money paid to the government for public services",
      "A discount on purchases",
      "Interest on savings",
      "A type of investment"
    ],
    correctAnswer: 0,
    explanation: "Taxes are mandatory payments to the government that fund schools, roads, police, and other public services."
  },
  {
    id: 14,
    question: "What is a portfolio?",
    answers: [
      "A collection of investments owned by one person",
      "A briefcase used for work",
      "A bank account",
      "A job application"
    ],
    correctAnswer: 0,
    explanation: "An investment portfolio is a collection of stocks, bonds, and other investments that a person owns."
  },
  {
    id: 15,
    question: "What is expense tracking?",
    answers: [
      "Keeping records of money you spend",
      "Calculating your salary",
      "Saving money automatically",
      "Paying your taxes"
    ],
    correctAnswer: 0,
    explanation: "Expense tracking means recording and monitoring how much money you spend on different things to understand your spending habits."
  },
  {
    id: 16,
    question: "What is a financial goal?",
    answers: [
      "A target for money you want to save or achieve",
      "The amount you earn per month",
      "The highest price you'll pay for something",
      "A type of investment fund"
    ],
    correctAnswer: 0,
    explanation: "A financial goal is something you want to achieve with your money, like saving for college or buying a car."
  },
  {
    id: 17,
    question: "What is a bank account?",
    answers: [
      "A place to safely store and manage your money",
      "A loan from the bank",
      "An investment in the stock market",
      "A contract with the government"
    ],
    correctAnswer: 0,
    explanation: "A bank account is an agreement with a bank where you can deposit, store, and withdraw your money safely."
  },
  {
    id: 18,
    question: "What is an emergency fund?",
    answers: [
      "Money saved for unexpected expenses",
      "Money borrowed from the government",
      "Money earned from investments",
      "Money for paying taxes"
    ],
    correctAnswer: 0,
    explanation: "An emergency fund is money you save and don't touch unless something unexpected happens, like a car repair or medical bill."
  },
  {
    id: 19,
    question: "What is GDP?",
    answers: [
      "The total value of goods and services a country produces",
      "The government's debt",
      "The amount people spend on shopping",
      "The stock market index"
    ],
    correctAnswer: 0,
    explanation: "GDP (Gross Domestic Product) measures the total value of all goods and services produced by a country in a specific period."
  },
  {
    id: 20,
    question: "What is a bill?",
    answers: [
      "A statement showing money you owe for a service",
      "Paper money",
      "A law passed by the government",
      "A discount coupon"
    ],
    correctAnswer: 0,
    explanation: "A bill is an invoice showing how much money you owe for something like electricity, water, internet, or other services."
  }
];
