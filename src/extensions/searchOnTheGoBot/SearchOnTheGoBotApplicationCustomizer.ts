import { override } from "@microsoft/decorators";
import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import * as ReactDOM from "react-dom";
import * as React from "react";
import Chatbot from "./components/ChatBot";

import * as strings from "SearchOnTheGoBotApplicationCustomizerStrings";

import { IChatbotProps } from "./components/IChatBotProps";

const LOG_SOURCE: string = "SearchOnTheGoBotApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISearchOnTheGoBotApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SearchOnTheGoBotApplicationCustomizer extends BaseApplicationCustomizer<ISearchOnTheGoBotApplicationCustomizerProperties> {
  private _bottomPlaceholder: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = "(No properties were provided.)";
    }

    // alert(`Hello from ${strings.Title}:\n\n${message}`);
    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
        );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }
      const user = this.context.pageContext.user;
      const elem: React.ReactElement<IChatbotProps> =
        React.createElement<IChatbotProps>(Chatbot, {
          userEmail: user.email,
          userFriendlyName: user.displayName,
        });
      ReactDOM.render(elem, this._bottomPlaceholder.domElement);
    }
  }

  private _onDispose(): void {}
}
