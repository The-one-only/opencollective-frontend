import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { CollectiveCategory } from '../lib/constants/collectives';

const TranslatedTags = defineMessages({
  [CollectiveCategory.ASSOCIATION]: {
    id: 'Tags.ASSOCIATION',
    defaultMessage: 'Association',
  },
  [CollectiveCategory.COLLECTIVE]: {
    id: 'Tags.COLLECTIVE',
    defaultMessage: 'Collective',
  },
  [CollectiveCategory.CONFERENCE]: {
    id: 'Tags.CONFERENCE',
    defaultMessage: 'Conference',
  },
  [CollectiveCategory.COOPERATIVE]: {
    id: 'Tags.COOPERATIVE',
    defaultMessage: 'Cooperative',
  },
  [CollectiveCategory.OPEN_SOURCE]: {
    id: 'Tags.OPEN_SOURCE',
    defaultMessage: 'Open source',
  },
  [CollectiveCategory.MEDIA]: {
    id: 'Tags.MEDIA',
    defaultMessage: 'Media',
  },
  [CollectiveCategory.MEETUP]: {
    id: 'Tags.MEETUP',
    defaultMessage: 'Meetup',
  },
  [CollectiveCategory.MOVEMENT]: {
    id: 'Tags.MOVEMENT',
    defaultMessage: 'Movement',
  },
  [CollectiveCategory.POLITICS]: {
    id: 'Tags.POLITICS',
    defaultMessage: 'Politics',
  },
  [CollectiveCategory.TECH_MEETUP]: {
    id: 'Tags.TECH_MEETUP',
    defaultMessage: 'Tech meetup',
  },
  [CollectiveCategory.US_NONPROFIT]: {
    id: 'Tags.US_NONPROFIT',
    defaultMessage: 'US nonprofit',
  },
});

/** Translates a list of tags */
class I18nCollectiveTags extends React.Component {
  static propTypes = {
    /** A tag or a list of tags */
    tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    /** A function used to render the tag */
    children: PropTypes.func.isRequired,
    /** Ignore tags if translation is missing */
    ignoreUntranslated: PropTypes.bool,
    /** @ignore */
    intl: PropTypes.object,
  };

  static defaultProps = {
    ignoreUntranslated: false,
    /** Default renderer, will render a string list */
    children: tags => {
      return tags.map((tag, index, translatedTags) => {
        if (index === translatedTags.length - 1) {
          return tag.value;
        } else {
          return `${tag.value}, `;
        }
      });
    },
  };

  render() {
    const { intl, children, tags, ignoreUntranslated } = this.props;
    const tagsToTranslate = typeof tags === 'string' ? [tags] : tags;
    const processedTags = tagsToTranslate.map(tag => {
      if (TranslatedTags[tag]) {
        return { value: intl.formatMessage(TranslatedTags[tag]), isTranslated: true };
      } else {
        return { value: tag, isTranslated: false };
      }
    });

    return children(ignoreUntranslated ? processedTags.filter(t => t.isTranslated) : processedTags);
  }
}

export default injectIntl(I18nCollectiveTags);
