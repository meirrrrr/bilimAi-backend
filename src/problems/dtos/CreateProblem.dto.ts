export interface CreateProblemDto {
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
  difficulty: string;
  topic: string;
}
