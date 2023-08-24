import { useEffect, useState } from "react";
function ThemeSwitcher() {
  var themes = [
    "test",
    "blueYellow",
    "redWhite",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const [currentTheme, setTheme] = useState(
    localStorage.getItem("theme") || "cupcake"
  );
  function changeTheme(e) {
    setTheme(e.currentTarget.dataset.theme);
  }
  console.log(currentTheme);
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <div className="mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
      {themes.map((theme, id) => (
        <div
          className={`card bg-base-100  m-2 shadow-xl hover:border-primary-focus outline-8 outline-base-content  ${
            currentTheme == theme ? "outline" : ""
          }`}
          data-theme={theme}
          onClick={changeTheme}
        >
          <figure className="px-10 pt-10">
            <img
              src={"https://loremflickr.com/320/240?random=" + id}
              alt="Theme cover"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <div className="grid grid-cols-4">
              <div className="badge badge-primary"></div>
              <div className="badge badge-secondary"></div>
              <div className="badge badge-accent"></div>
              <div className="badge badge-neutral"></div>
            </div>
            <h2 className="card-title">{theme}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThemeSwitcher;

{
  /* <input
       type="checkbox"
       className="toggle"
       defaultChecked={
         typeof window !== "undefined" &&
         localStorage.getItem("theme") === "cupcake"
       }
       onClick={(e) => {
         let newTheme = e.target.checked ? "cupcake" : "light";
         localStorage.setItem("theme", newTheme);
         document.documentElement.setAttribute("data-theme", newTheme);
        }}
     /> */
}
