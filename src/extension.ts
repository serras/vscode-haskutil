import * as vscode from 'vscode'; 

import ImportProvider from './features/importProvider';
import QualifiedImportProvider from './features/qualifiedImportProvider';
import OrganizeImportProvider from './features/organizeImportProvider';
import ExtensionProvider from './features/extensionProvider';
import OrganizeExtensionProvider from './features/organizeExtensionProvider';
import TopLevelSignatureProvider from './features/topLevelSignatureProvider';
import TypedHoleProvider from './features/typedHoleProvider';
import TypeWildcardProvider from './features/typeWildcardProvider';

export function activate(context: vscode.ExtensionContext)
{
	let isGhcIde = vscode.extensions.getExtension('DigitalAssetHoldingsLLC.ghcide') !== undefined;
	
	var providers;
	if (isGhcIde) {
		// Do not add functionality provided by ghcide itself
		providers = [
			new ImportProvider(),
			new QualifiedImportProvider(),
			new OrganizeImportProvider(),
			new OrganizeExtensionProvider(),
		];
	} else {
		providers = [
			new ImportProvider(),
			new QualifiedImportProvider(),
			new OrganizeImportProvider(),
			new ExtensionProvider(),
			new OrganizeExtensionProvider(),
			new TopLevelSignatureProvider(),
			new TypedHoleProvider(),
			new TypeWildcardProvider(),
		];
  }

	for (const provider of providers)
	{
		provider.activate(context.subscriptions);
		vscode.languages.registerCodeActionsProvider('haskell', provider);
	}
}
