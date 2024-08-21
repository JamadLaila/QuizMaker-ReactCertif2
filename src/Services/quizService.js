import he from 'he';

export const fetchCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
};

export const fetchQuestions = async (category, difficulty) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const data = await response.json();
  return data.results.map((item) => ({
    ...item,
    question: he.decode(item.question),
    answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
  }));
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
