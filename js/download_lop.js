import { pubsItems, procItems } from "./bibtex2js.js";

const { jsPDF } = window.jspdf;

document.getElementById("downloadPubsPDF").addEventListener("click", () => {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth  = doc.internal.pageSize.getWidth();
  // const pageWidth  = 210;

  let y = 15;

  /* ================= HEADER ================= */

  doc.setFont("Times", "Bold");
  doc.setFontSize(16);
  doc.text("List of Publications - Dr. Deepak Kumar", pageWidth / 2, y, { align: "center" });

  y += 15;

  /* ================= JOURNAL PUBLICATIONS ================= */

  y = sectionTitle(doc, "Journal Articles", y, pageHeight);
  y += 1;
  pubsItems.forEach((p, i) => {
    y = addIndentedCitation(
      doc,
      {
        index: i + 1,
        ...p
      },
      y,
      pageHeight,
      pageWidth
    );
  });

  /* ================= PROCEEDINGS ================= */

  y += 6;
  y = sectionTitle(doc, "Conference Proceedings / Preprints", y, pageHeight);
  y += 1;
  procItems.forEach((p, i) => {
    y = addIndentedCitation(
      doc,
      {
        index: i + 1,
        ...p
      },
      y,
      pageHeight,
      pageWidth
    );
  });

  /* ================= PAGE NUMBERS ================= */

  addPageNumbers(doc);

  /* ================= SAVE ================= */

  doc.save("DeepakKumar_LOP.pdf");
});

/* =========================================================
   HELPERS
========================================================= */

function sectionTitle(doc, title, y, pageHeight) {
  if (y > pageHeight - 25) {
    doc.addPage();
    y = 15;
  }

  doc.setFont("Times", "Bold");
  doc.setFontSize(12);
  doc.text(title, 10, y);

  doc.setFont("Times", "Normal");
  doc.setFontSize(11);

  return y + 6;
}

function addIndentedCitation(doc, data, y, pageHeight, pageWidth) {
  const numX = 15;
  const textX = 24;
  const rightMargin = 24;
  const maxWidth = pageWidth - textX - rightMargin;
  const lineHeight = 6;

  const baseText =
    `${data.author}. "${data.title}". ` +
    `${data.journal ? data.journal + ", " : ""}` +
    `${data.volume ? "Vol. " + data.volume + ", " : ""}` +
    `${data.pages ? data.pages + " " : ""}` +
    `(${data.year})`;

  const lines = doc.splitTextToSize(baseText, maxWidth);

  lines.forEach((line, idx) => {
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 15;
    }

    /* index number */
    if (idx === 0) {
      doc.setTextColor(0, 0, 0);
      doc.text(`${data.index}.`, numX, y);
    }

    /* main text */
    doc.text(line, textX, y, {
      maxWidth,
      align: "justify"
    });

    /* inline DOI + arXiv on last line */
    if (idx === lines.length - 1) {
      let xCursor = textX + doc.getTextDimensions(line).w + 2;
      const spaceLeft = pageWidth - rightMargin - xCursor;

      let links = [];

      if (data.doi) {
        links.push({
          text: ` DOI:${data.doi}, `,
          url: data.doi
        });
      }

      if (data.arxiv) {
        const id = data.arxiv.replace("arXiv:", "").trim().split(" ")[0];
        links.push({
          text: ` arXiv:${id}`,
          url: `https://arxiv.org/abs/${id}`
        });
      }

      links.forEach(link => {
        const w = doc.getTextDimensions(link.text).w;

        if (w > spaceLeft) {
          y += lineHeight;
          xCursor = textX;
        }

        doc.setTextColor(200, 200, 255);
        doc.textWithLink(link.text, xCursor, y, { url: link.url });
        xCursor += w;
      });

      doc.setTextColor(0, 0, 0);
    }

    y += lineHeight;
  });

  return y + 2;
}

function addPageNumbers(doc) {
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("Times", "Normal");
    doc.setFontSize(9);
    doc.text(
      `[ Page ${i} of ${pageCount} ]`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
}
