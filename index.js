const $ = document.querySelector.bind(document);
const input = $(".input-text");
const inBtn = $(".input-btn");
const output = $(".output-text");
const foundLabel = $("p");
const gmailBtn = $(".gmail-btn");
const hotmailBtn = $(".hotmail-btn");
const allBtn = $(".all-btn");

let gmail = "";
let hotmail = "";
let gmailCounter = 0;
let hotmailCounter = 0;
let resultArr = [];

const treat = text => {
  let newText = text.replace(/(\r\n|\n|\r)/gm, " ");
  return newText.split(" ");
};

const extractEmail = arr => {
  arr.forEach(el => {
    if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        el.toLowerCase()
      ) &&
      (el.includes("@hotmail.com") ||
        el.includes("@outlook.com") ||
        el.includes("@hotmail.fr") ||
        el.includes("@gmail.com"))
    ) {
      if (resultArr.indexOf(el) === -1 && el.includes("@gmail.com")) {
        gmail += `${el}\n`;
        gmailCounter++;
        resultArr.push(el);
      } else if (
        resultArr.indexOf(el) === -1 &&
        (el.includes("@hotmail.com") ||
          el.includes("@outlook.com") ||
          el.includes("@hotmail.fr"))
      ) {
        hotmail += `${el}\n`;
        hotmailCounter++;
        resultArr.push(el);
      }
    }
  });
};

window.addEventListener("click", e => {
  let data = input.value;
  if (e.target === inBtn && input.value != "") {
    extractEmail(treat(data));

    output.innerHTML = gmail + hotmail;
    foundLabel.innerHTML = `the total number of emails found is : ${
      hotmailCounter + gmailCounter
    }`;

    input.value = "";
  } else if (e.target === inBtn && input.value === "") {
    foundLabel.innerHTML = "Paste emails in the input field";
  }
});

window.addEventListener("click", e => {
  if (e.target === gmailBtn && output.value != "") {
    output.innerHTML = gmail;
    foundLabel.innerHTML = `Gmail found : ${gmailCounter}`;
  } else if (e.target === hotmailBtn && output.value != "") {
    output.innerHTML = hotmail;
    foundLabel.innerHTML = `Hotmail Found : ${hotmailCounter}`;
  } else if (e.target === allBtn && output.value != "") {
    output.innerHTML = gmail + hotmail;
    foundLabel.innerHTML = `the total number of emails found is : ${
      hotmailCounter + gmailCounter
    }`;
  }
});
