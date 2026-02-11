import { pubsItems } from "./bibtex2js.js";

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("pub-list");
  if (!list) return;

  // BibTeX-style sort: year ↓, month ↓, title ↑
  const sorted = [...pubsItems].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    if ((b.month || 0) !== (a.month || 0))
      return (b.month || 0) - (a.month || 0);
    return a.title.localeCompare(b.title);
  });

  const total = sorted.length; // reverse numbering

  sorted.forEach((item, index) => {
    const li = document.createElement("li");

    li.className =
      "pub-item relative p-3 pl-12 rounded-lg hover:bg-gray-50 transition-colors";

    const counter = total - index;

    li.innerHTML = `
      <!-- left-side counter -->
      <span class="absolute left-3 top-3
                   text-sm font-semibold text-gray-600">
        <strong style="color: #0d9488;">${counter}). </strong>
      </span>

      <!-- <strong>D. Kumar</strong>${formatCoauthors(item.author)}, -->
      ${formatCoauthors(item.author)},
      "${item.title}",
      ${item.journal ? `
        <span class="journal" style="color:#805ad5;font-weight:600;">
          ${item.journal}
        </span>
      ` : ""}
      ${formatJournalDetails(item)}, ${item.arxiv},
      ${item.year}.
    `;

    list.appendChild(li);
  });
});

/* ===================== helpers ===================== */

function formatCoauthors(authorStr) {
  const authors = authorStr.split(";").map(a => a.trim());

  const formatted = authors.map(author =>
    author === "D. Kumar" ? `<strong>${author}</strong>` : author
  );

  return formatted.length > 1
    ? "" + formatted.slice(1).join(", ")
    : "";
}


// function formatCoauthors(authorStr) {
//   const authors = authorStr.split(";").map(a => a.trim());
//   return authors.length > 1
//     ? ", " + authors.slice(1).join(", ")
//     : "";
// }

// function formatCoauthors(authorStr) {
//   const authors = authorStr.split(";").map(a => a.trim());

//   const formatted = authors.map(author =>
//     author === "D. Kumar" ? `<strong>${author}</strong>` : author
//   );

//   return formatted.length > 0
//     ? ", " + formatted.join(", ")
//     : "";
// }


// function formatJournalDetails(item) {
//   if (!item.journal) return "";

//   const vol = item.volume || "";
//   const pages = item.pages || "";
//   const text = [vol, pages].filter(Boolean).join(", ");

//   if (!item.doi || !text) return text;

//   return `
//     <a href="${item.doi}" target="_blank"
//        class="text-[var(--fg-500)] hover:underline">
//       ${text}
//     </a>
//   `;
// }

function formatJournalDetails(item) {
  if (!item.journal) return "";

  const vol = item.volume || "";
  const pages = item.pages || "";
  let text = [vol, pages].filter(Boolean).join(", ");

  // Bold your name if it appears
  text = text.replace(
    /\bD\. Kumar\b/g,
    "<strong>D. Kumar</strong>"
  );

  if (!item.doi || !text) return text;

  return `
    <a href="${item.doi}" target="_blank"
       class="text-[var(--fg-500)] hover:underline">
      ${text}
    </a>
  `;
}

