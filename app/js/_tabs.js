'use strict'

const tabsButtons = document.querySelectorAll('.tabs-button');
const tabsPanels = document.querySelectorAll('.tabs-panel');
const widthBreakpoint = 576;

function showTab(e) {
	if (!e.target.classList.contains('tabs-button')) return;
	
	const currentGroup = e.target.dataset.tabGroup;
	const currentId = e.target.dataset.tabId;
	
	tabsButtons.forEach(tabsButton => {
		if(tabsButton.dataset.tabGroup == currentGroup) {
			tabsButton.dataset.tabId == currentId ?
			tabsButton.classList.add('is-active') :
			tabsButton.classList.remove('is-active');
		}
	});
	
	tabsPanels.forEach(tabsPanel => {
		if(tabsPanel.dataset.tabGroup == currentGroup) {
		  tabsPanel.dataset.tabId == currentId ?
		  tabsPanel.classList.add('is-active') :
		  tabsPanel.classList.remove('is-active');
		}
	});
}

document.body.addEventListener('click', showTab);