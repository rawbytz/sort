// ==UserScript==
// @name         Sort WorkFlowy
// @namespace    https://rawbytz.wordpress.com
// @version      3.8
// @description  Use Ctrl+Shift+S to sort the current zoom level children.
// @author       rawbytz
// @match        https://workflowy.com/*
// @match        https://*.workflowy.com/*
// @updateUrl    https://github.com/rawbytz/sort/raw/master/sortMe.user.js
// @downloadUrl  https://github.com/rawbytz/sort/raw/master/sortMe.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';
  function sortWF(maxChildren = 1000) {
    function toastMsg(str, sec, err) {
      WF.showMessage(str, err);
      setTimeout(WF.hideMessage, (sec || 2) * 1000);
    }
    function sortAndMove(items, reverse) {
      WF.hideDialog();
      setTimeout(() => {
        items.sort((a, b) => reverse ? b.getNameInPlainText().localeCompare(a.getNameInPlainText()) : a.getNameInPlainText().localeCompare(b.getNameInPlainText()));
        WF.editGroup(() => {
          items.forEach((item, i) => {
            if (item.getPriority() !== i) WF.moveItems([item], parent, i);
          });
        });
        // set focus to parent after sort
        WF.editItemName(parent);
        toastMsg(`Sorted ${reverse ? "Z-A." : "A-Z."}`, 1)
      }, 50);
    }
    const htmlEscText = str => str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    function showSortDialog(bodyHtml, title) {
      const addButton = (num, name) => `<button type="button" class="btnX" id="btn${num.toString()}">${name}</button>`;
      const style = '.btnX{font-size:18px;background-color:steelblue;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';
      const buttons = addButton(1, "A-Z") + addButton(2, "Z-A");
      WF.showAlertDialog(`<style>${htmlEscText(style)}</style><div>${bodyHtml}</div><div>${buttons}</div>`, title);
      const intervalId = setInterval(function () {
        let btn1 = document.getElementById("btn1");
        if (btn1) {
          clearInterval(intervalId);
          const btn2 = document.getElementById("btn2");
          btn1.focus();
          btn1.onclick = function () { sortAndMove(children) };
          btn2.onclick = function () { sortAndMove(children, true) };
        }
      }, 50);
    }
    if (WF.currentSearchQuery()) return void toastMsg("Sorting is disabled when search is active.", 3, true);
    const parent = WF.currentItem();
    if (parent.isEmbedded()) return void toastMsg("Sorting disabled for added shares.", 3, true);
    const children = parent.getChildren();
    if (children.length < 2) return void toastMsg("Nothing to sort.", 3, true);
    if (children.length > maxChildren) return void toastMsg(`Sorting more than ${maxChildren} children upsets the WorkFlowy gods, and has been disabled.`, 5, true);
    const sortInfo = `Sort <b>${children.length}</b> children?`;
    showSortDialog(sortInfo, parent.getNameInPlainText());
  }
  // Ctrl+Shft+S
  document.addEventListener("keydown", function (event) {
    if (!event.altKey && event.ctrlKey && event.shiftKey && !event.metaKey && event.key === "S") {
      sortWF();
      event.preventDefault();
    }
  });
})();