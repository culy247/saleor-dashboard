import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import LanguageSwitch from "@saleor/components/LanguageSwitch";
import PageHeader from "@saleor/components/PageHeader";
import { PageTranslationFragment } from "@saleor/fragments/types/PageTranslationFragment";
import { commonMessages, sectionNames } from "@saleor/intl";
import { Backlink } from "@saleor/macaw-ui";
import { getStringOrPlaceholder } from "@saleor/misc";
import {
  PageTranslationInputFieldName,
  TranslationsEntitiesPageProps
} from "@saleor/translations/types";
import React from "react";
import { useIntl } from "react-intl";

import { LanguageCodeEnum } from "../../../types/globalTypes";
import TranslationFields from "../TranslationFields";

export interface TranslationsPagesPageProps
  extends TranslationsEntitiesPageProps {
  data: PageTranslationFragment;
  onAttributeValueSubmit: TranslationsEntitiesPageProps["onSubmit"];
}

const TranslationsPagesPage: React.FC<TranslationsPagesPageProps> = ({
  activeField,
  disabled,
  languageCode,
  languages,
  data,
  saveButtonState,
  onBack,
  onDiscard,
  onEdit,
  onLanguageChange,
  onSubmit,
  onAttributeValueSubmit
}) => {
  const intl = useIntl();

  return (
    <Container>
      <Backlink onClick={onBack}>
        {intl.formatMessage(sectionNames.translations)}
      </Backlink>
      <PageHeader
        title={intl.formatMessage(
          {
            defaultMessage: 'Translation Page "{pageName}" - {languageCode}',
            description: "header"
          },
          {
            languageCode,
            pageName: getStringOrPlaceholder(data?.page?.title)
          }
        )}
      >
        <LanguageSwitch
          currentLanguage={LanguageCodeEnum[languageCode]}
          languages={languages}
          onLanguageChange={onLanguageChange}
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage(commonMessages.generalInformations)}
        fields={[
          {
            displayName: intl.formatMessage({
              defaultMessage: "Page Title"
            }),
            name: PageTranslationInputFieldName.title,
            translation: data?.translation?.title || null,
            type: "short" as "short",
            value: data?.page?.title
          },
          {
            displayName: intl.formatMessage({
              defaultMessage: "Content",
              description: "page content"
            }),
            name: PageTranslationInputFieldName.content,
            translation: data?.translation?.content || null,
            type: "rich" as "rich",
            value: data?.page?.content
          }
        ]}
        saveButtonState={saveButtonState}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />

      <CardSpacer />
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage({
          defaultMessage: "Search Engine Preview"
        })}
        fields={[
          {
            displayName: intl.formatMessage({
              defaultMessage: "Search Engine Title"
            }),
            name: PageTranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: "short" as "short",
            value: data?.page?.seoTitle
          },
          {
            displayName: intl.formatMessage({
              defaultMessage: "Search Engine Description"
            }),
            name: PageTranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: "long" as "long",
            value: data?.page?.seoDescription
          }
        ]}
        saveButtonState={saveButtonState}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage(commonMessages.attributes)}
        fields={
          data?.attributeValues?.map(attrVal => ({
            id: attrVal.attributeValue.id,
            displayName: attrVal.name,
            name: attrVal?.name,
            translation: attrVal?.translation?.richText || null,
            type: "rich" as "rich",
            value: attrVal?.richText
          })) || []
        }
        saveButtonState={saveButtonState}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onAttributeValueSubmit}
      />
    </Container>
  );
};
TranslationsPagesPage.displayName = "TranslationsPagesPage";
export default TranslationsPagesPage;
