# Sort WorkFlowy
- Zoom on a bullet.
- Activate the bookmarklet or use the userscript shortcut *Ctrl+Shft+S*.
- A prompt appears with 2 sorting buttons: *A-Z* and *Z-A*.
- Only the zoom level children get sorted.
- Grandchildren stay with their parents, but are not sorted.
- Completed children are sorted, even when hidden.
- After sorting is complete, a message confirms the sort.
- Undo the sort using WorkFlowy's standard undo feature.
- For transparency, the bookmarklet will not sort if search is active.
- To limit the load on WorkFlowy's servers, the maximum number of children that can be sorted is 400.

![sortWorkFlowy](https://i.imgur.com/oouWrha.png)

## Installation: Drag this link to your bookmarks bar:

<a href="javascript:(function sortWF_3_4(maxChildren=400){function toastMsg(str,sec,err){WF.showMessage(str,err);setTimeout(WF.hideMessage,(sec||2)*1e3)}function sortAndMove(items,reverse){WF.hideDialog();setTimeout(()=&gt;{items.sort((a,b)=&gt;reverse?b.getNameInPlainText().localeCompare(a.getNameInPlainText()):a.getNameInPlainText().localeCompare(b.getNameInPlainText()));WF.editGroup(()=&gt;{items.forEach((item,i)=&gt;{if(item.getPriority()!==i)WF.moveItems([item],parent,i)})});WF.editItemName(parent);toastMsg(`Sorted ${reverse?&quot;Z-A.&quot;:&quot;A-Z.&quot;}`,1)},50)}const htmlEscText=str=&gt;str.replace(/&amp;/g,&quot;&amp;amp;&quot;).replace(/&gt;/g,&quot;&amp;gt;&quot;).replace(/&lt;/g,&quot;&amp;lt;&quot;).replace(/&quot;/g,&quot;&amp;quot;&quot;);function showSortDialog(bodyHtml,title,button1,button2){const style='.btnX{font-size:18px;background-color:#49baf2;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';const buttons=`&lt;div&gt;&lt;button type=&quot;button&quot; class=&quot;btnX&quot; id=&quot;btn1&quot;&gt;${button1}&lt;/button&gt;&lt;button type=&quot;button&quot; class=&quot;btnX&quot; id=&quot;btn2&quot;&gt;${button2}&lt;/button&gt;&lt;/div&gt;`;WF.showAlertDialog(`&lt;style&gt;${htmlEscText(style)}&lt;/style&gt;&lt;div&gt;${bodyHtml}&lt;/div&gt;${buttons}`,title);setTimeout(()=&gt;{const btn1=document.getElementById(&quot;btn1&quot;);const btn2=document.getElementById(&quot;btn2&quot;);btn1.focus();btn1.onclick=function(){sortAndMove(children)};btn2.onclick=function(){sortAndMove(children,true)}},100)}const canCreateChild=item=&gt;!item.isReadOnly()||item.isMainDocumentRoot()||item.isAddedSubtreePlaceholder()&amp;&amp;!item.data.added_subtree.isReadOnly();if(WF.currentSearchQuery()){return void toastMsg(&quot;Sorting is disabled when search is active.&quot;,3,true)}const parent=WF.currentItem();if(!canCreateChild(parent))return void toastMsg(&quot;Read-Only. Cannot sort bullets.&quot;,3,true);const children=parent.getChildren();if(children.length&lt;2)return void toastMsg(&quot;Nothing to sort.&quot;,3,true);if(children.length&gt;maxChildren)return void toastMsg(`Sorting more than ${maxChildren} children upsets the WorkFlowy gods, and has been disabled.`,5,true);const sortInfo=`Sort &lt;b&gt;${children.length}&lt;/b&gt; children?`;showSortDialog(sortInfo,parent.getNameInPlainText(),'A-Z','Z-A')})();">sortWF</a>

## Links:
- [Click here to install in your script manager.](https://github.com/rawbytz/sort/raw/master/sortMe.user.js)
- [Source code](https://github.com/rawbytz/sort/blob/master/sortWF.js)
- [rawbytz Blog post](https://rawbytz.wordpress.com/2018/06/07/sorting-bullets-in-workflowy-easy-as-1-2-3/)

## Version Notes:
- v3.4 (2020-01-26) updated html encoder
- v3.3 (2019-05-29) Bug fix: will not try to sort Read-Only bullets
- v3.2 (2019-01-06) Minor code cleanup 
- v3.1 (2018-12-11) Update to new move API 
- v3.0 (2018-11-06) Fix broken dialog 

<!-- 
LINKS REFERENCING THIS
@BlOGGER https://www.blogger.com/blogger.g?blogID=6597785605721546133#editor/target=page;pageID=954485241269525093

@BLOG https://rawbytz.wordpress.com/2018/06/07/sorting-bullets-in-workflowy-easy-as-1-2-3/

@SOFTWARE https://rawbytz.wordpress.com/software/

@WFBLOG https://blog.workflowy.com/2018/10/02/sorting/
 -->
