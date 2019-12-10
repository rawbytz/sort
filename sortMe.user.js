// ==UserScript==
// @name         Sort WorkFlowy
// @namespace    https://rawbytz.wordpress.com
// @version      3.3
// @description  Use Ctrl+Shift+S to sort the current zoom level children.
// @author       rawbytz
// @match        https://workflowy.com/*
// @match        https://beta.workflowy.com/*
// @updateUrl    https://gist.github.com/rawbytz/3b295652c24738b044dd4d4ee8b4a0e3/raw/sortWorkFlowy.user.js
// @downloadUrl  https://gist.github.com/rawbytz/3b295652c24738b044dd4d4ee8b4a0e3/raw/sortWorkFlowy.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';
  function sortWF(maxChildren = 400) {
    function toastMsg(str, sec, err) {
      WF.showMessage(str.bold(), err);
      setTimeout(() => WF.hideMessage(), (sec || 2) * 1000);
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
    function showSortDialog(bodyHtml, title, button1, button2) {
      const style = '.btnX{font-size:18px;background-color:#49baf2;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';
      const buttons = `<div><button type="button" class="btnX" id="btn1">${button1}</button><button type="button" class="btnX" id="btn2">${button2}</button></div>`;
      WF.showAlertDialog(`<style>${htmlEscapeText(style)}</style><div>${bodyHtml}</div>${buttons}`, title);
      setTimeout(() => {
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        btn1.focus();
        btn1.onclick = function () { sortAndMove(children) };
        btn2.onclick = function () { sortAndMove(children, true) };
      }, 100);
    }
    const canCreateChild = item => !item.isReadOnly() || item.isMainDocumentRoot() || (item.isAddedSubtreePlaceholder() && !item.data.added_subtree.isReadOnly());
    if (WF.currentSearchQuery()) {
      return void toastMsg("Sorting is disabled when search is active.", 3, true);
    }
    const parent = WF.currentItem();
    if (!canCreateChild(parent)) return void toastMsg("Read-Only. Cannot sort bullets.", 3, true);
    const children = parent.getChildren();
    if (children.length < 2) return void toastMsg("Nothing to sort.", 3, true);
    if (children.length > maxChildren) return void toastMsg(`Sorting more than ${maxChildren} children upsets the WorkFlowy gods, and has been disabled.`, 5, true);
    const sortInfo = `Sort <b>${children.length}</b> children?`;
    showSortDialog(sortInfo, parent.getNameInPlainText(), 'A-Z', 'Z-A');
  }
  // Ctrl+Shft+S
  document.addEventListener("keydown", function (event) {
    if (!event.altKey && event.ctrlKey && event.shiftKey && !event.metaKey && event.key === "s") {
      sortWF();
      event.preventDefault();
    }
  });
})();