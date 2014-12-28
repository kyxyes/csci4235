// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "extensions/browser/api/widget/widget_api.h"

#include "base/sys_info.h"
#include "chrome/browser/ui/browser.h"
#include "chrome/browser/ui/browser_list.h"
#include "chrome/browser/ui/tabs/tab_strip_model.h"

#include "chrome/browser/extensions/window_controller_list.h"
#include "content/public/browser/web_contents.h"
#include "chrome/browser/ui/tabs/tab_strip_model.h"
#include "chrome/browser/ui/browser.h"
#include "chrome/browser/ui/browser_iterator.h"
#include "chrome/browser/sessions/session_tab_helper.h"
using content::WebContents;

namespace extensions {

WidgetGetWindowsFunction::WidgetGetWindowsFunction() {
}

WidgetGetWindowsFunction::~WidgetGetWindowsFunction() {
}

AsyncExtensionFunction::ResponseAction WidgetGetWindowsFunction::Run() {
  
  const WindowControllerList::ControllerList& windows = WindowControllerList::GetInstance()->windows();
  base::ListValue* browser_list_ret = new base::ListValue();  


  for(WindowControllerList::ControllerList::const_iterator iter = windows.begin();iter!=windows.end();++iter){
  // Dummy dictionary.
  base::DictionaryValue* result = new base::DictionaryValue();

  result->SetInteger("id", (*iter)->GetWindowId());
  //result->SetInteger("num",windows.size());
  

  //result->SetWithoutPathExpansion("Window", *iter);
  browser_list_ret->Append(result);
  
  }

  return RespondNow(OneArgument(browser_list_ret));
}

WidgetGetTabsForWindowFunction::WidgetGetTabsForWindowFunction() {
}

WidgetGetTabsForWindowFunction::~WidgetGetTabsForWindowFunction() {
}

AsyncExtensionFunction::ResponseAction WidgetGetTabsForWindowFunction::Run() {
//  scoped_ptr<core_api::widget::GetTabsForWindow::Params> params(
//      core_api::widget::GetTabsForWindow::Params::Create(*args_));
//  EXTENSION_FUNCTION_VALIDATE(params.get());
//  const core_api::widget::Window& window = params->window;

  // Dummy dictionary, search for window with |window.id|.
base::ListValue* tab_list_ret  = new base::ListValue();
//for(chrome::BrowserIterator it; !it.done();it.Next()){
 //Browser* browser = *it;
 Browser* current_browser = GetCurrentBrowser();
 TabStripModel* tab_strip = current_browser->tab_strip_model();
 WebContents* activeContent = tab_strip->GetActiveWebContents();
 for(int i = 0; i<tab_strip->count();++i){
  WebContents* web_contents = tab_strip->GetWebContentsAt(i);

  base::DictionaryValue* result = new base::DictionaryValue();
  result->SetInteger("id",SessionTabHelper::IdForTab(web_contents));
  result->SetString("title",  web_contents->GetTitle());
  result->SetString("url", web_contents->GetURL().spec());
  if(web_contents == activeContent){
  result->SetBoolean("isSelected", true);
  }else{
  result->SetBoolean("isSelected", false);
  }

 
  tab_list_ret->Append(result);
}
//}
  return RespondNow(OneArgument(tab_list_ret));
}

}  // namespace extensions
