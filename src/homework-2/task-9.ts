// Є масив coursesArray котрий лежить в arrays.js (на цей момент ви вже знаєте де він знаходиться)
//
// Створити для кожного елементу масиву свій блок, блок розділити блоками, в яких будуть зберігатись значення окремих властивостей, для властивості modules зробити список з елементами
//
// Приклад структури знаходиться у файлі example.png, який лежить в папці з поточним файлом

type Course = {
  title: string;
  monthDuration: number;
  hourDuration: number;
  modules: string[];
};

let coursesArray: Course[] = [
  {
    title: "JavaScript Complex",
    monthDuration: 5,
    hourDuration: 909,
    modules: [
      "html",
      "css",
      "js",
      "mysql",
      "mongodb",
      "react",
      "angular",
      "aws",
      "docker",
      "git",
      "node.js",
    ],
  },
  {
    title: "Java Complex",
    monthDuration: 6,
    hourDuration: 909,
    modules: [
      "html",
      "css",
      "js",
      "mysql",
      "mongodb",
      "angular",
      "aws",
      "docker",
      "git",
      "java core",
      "java advanced",
    ],
  },
  {
    title: "Python Complex",
    monthDuration: 6,
    hourDuration: 909,
    modules: [
      "html",
      "css",
      "js",
      "mysql",
      "mongodb",
      "angular",
      "aws",
      "docker",
      "python core",
      "python advanced",
    ],
  },
  {
    title: "QA Complex",
    monthDuration: 4,
    hourDuration: 909,
    modules: ["html", "css", "js", "mysql", "mongodb", "git", "QA/QC"],
  },
  {
    title: "FullStack",
    monthDuration: 7,
    hourDuration: 909,
    modules: [
      "html",
      "css",
      "js",
      "mysql",
      "mongodb",
      "react",
      "angular",
      "aws",
      "docker",
      "git",
      "node.js",
      "python",
      "java",
    ],
  },
  {
    title: "Frontend",
    monthDuration: 4,
    hourDuration: 909,
    modules: [
      "html",
      "css",
      "js",
      "mysql",
      "mongodb",
      "react",
      "angular",
      "aws",
      "docker",
      "git",
      "sass",
    ],
  },
];

for (const course of coursesArray) {
  const courseBlock: HTMLDivElement = document.createElement("div");
  const title: HTMLHeadingElement = document.createElement("h2");
  const monthDuration: HTMLDivElement = document.createElement("div");
  const hourDuration: HTMLDivElement = document.createElement("div");
  const modulesBlockTitle: HTMLDivElement = document.createElement("div");
  const modulesBlockList: HTMLUListElement = document.createElement("ul");

  title.innerText = course.title;
  title.classList.add("title");

  monthDuration.innerText = `Month duration: ${course.monthDuration}`;
  monthDuration.classList.add("month-duration");

  hourDuration.innerText = `Hour duration: ${course.hourDuration}`;
  hourDuration.classList.add("hour-duration");

  modulesBlockTitle.innerText = `Modules:`;
  modulesBlockList.classList.add("modules");

  course.modules.forEach((item) => {
    const moduleItem: HTMLLIElement = document.createElement("li");
    const icon: HTMLImageElement = document.createElement("img");

    moduleItem.classList.add("module-item");

    icon.src = "https://cdn-icons-png.flaticon.com/512/1828/1828817.png";
    icon.alt = "icon";
    icon.style.width = "16px";
    icon.style.height = "16px";
    icon.style.marginRight = "8px";
    icon.style.verticalAlign = "middle";

    moduleItem.append(icon, item);
    modulesBlockList.appendChild(moduleItem);
  });

  courseBlock.append(
    title,
    monthDuration,
    hourDuration,
    modulesBlockTitle,
    modulesBlockList
  );

  document.body.appendChild(courseBlock);
}
