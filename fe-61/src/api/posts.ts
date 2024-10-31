import { Post as IPost } from 'api/endpoints/blog';

const mockPosts: IPost[] = [
  {
    id: 1,
    image: "http://cdn.motorpage.ru/Photos/300/14F3.jpg",
    text: "Some Ferrari",
    date: "2021-10-08",
    lessonNum: 49,
    title: "Ferrari",
    author: 123,
    like: 0, // Значение по умолчанию, можно изменить
    dislike: 0, // Значение по умолчанию, можно изменить
    isFavorite: false, // Значение по умолчанию, можно изменить
  },
  {
    id: 2,
    image: "http://cdn.motorpage.ru/Photos/300/1165B.jpg",
    text: "Some BMW",
    date: "2021-11-08",
    lessonNum: 50,
    title: "BMW",
    author: 124,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 3,
    image: "http://cdn.motorpage.ru/Photos/300/11066.jpg",
    text: "Some Audi",
    date: "2021-12-08",
    lessonNum: 51,
    title: "Audi",
    author: 125,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 4,
    image: "http://cdn.motorpage.ru/Photos/300/110E4.jpg",
    text: "Some Mercedes",
    date: "2021-10-15",
    lessonNum: 52,
    title: "Mercedes",
    author: 126,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 5,
    image: "http://cdn.motorpage.ru/Photos/300/11957.jpg",
    text: "Some Toyota",
    date: "2021-10-20",
    lessonNum: 53,
    title: "Toyota",
    author: 127,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 6,
    image: "http://cdn.motorpage.ru/Photos/300/1DB3.jpg",
    text: "Some Honda",
    date: "2021-11-01",
    lessonNum: 54,
    title: "Honda",
    author: 128,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 7,
    image: "http://cdn.motorpage.ru/Photos/300/19C.jpg",
    text: "Some Ford",
    date: "2021-10-28",
    lessonNum: 55,
    title: "Ford",
    author: 129,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 8,
    image: "http://cdn.motorpage.ru/Photos/300/Chevrolet_Bl.jpg",
    text: "Some Chevrolet",
    date: "2021-09-08",
    lessonNum: 56,
    title: "Chevrolet",
    author: 130,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 9,
    image: "http://cdn.motorpage.ru/Photos/300/1BC6.jpg",
    text: "Some Porsche",
    date: "2021-11-02",
    lessonNum: 57,
    title: "Porsche",
    author: 131,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 10,
    image: "http://cdn.motorpage.ru/Photos/300/1E54.jpg",
    text: "Some Lexus",
    date: "2021-10-22",
    lessonNum: 58,
    title: "Lexus",
    author: 132,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
  {
    id: 11,
    image: "http://cdn.motorpage.ru/Photos/300/1B96.jpg",
    text: "Some Nissan",
    date: "2021-10-28",
    lessonNum: 59,
    title: "Nissan",
    author: 133,
    like: 0,
    dislike: 0,
    isFavorite: false,
  },
];



// function shuffleArray<T>(array: T[]): T[] {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]]; // меняем элементы местами
//   }
//   return array;
// }

export const getAllPosts = async (): Promise<IPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPosts);
    }, 100);
  });
};

export const getPostById = async (id: number): Promise<IPost | null> => {
  return new Promise((resolve) => {
    const post = mockPosts.find(post => post.id === id) ?? null;

    setTimeout(() => {
      resolve(post);
    }, 0);
  });
};

