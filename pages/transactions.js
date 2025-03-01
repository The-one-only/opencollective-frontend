import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CollectiveCover from '../components/CollectiveCover';
import ErrorPage from '../components/ErrorPage';

import TransactionsWithData from '../components/expenses/TransactionsWithData';

import { addCollectiveCoverData } from '../lib/graphql/queries';

import Page from '../components/Page';
import Loading from '../components/Loading';
import { withUser } from '../components/UserProvider';

class TransactionsPage extends React.Component {
  static getInitialProps({ query: { collectiveSlug } }) {
    return { slug: collectiveSlug };
  }

  static propTypes = {
    slug: PropTypes.string, // from getInitialProps, for addCollectiveCoverData
    data: PropTypes.object.isRequired, // from withData
    LoggedInUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { Collective: get(props, 'data.Collective') };
  }

  async componentDidMount() {
    const { data } = this.props;
    const Collective = (data && data.Collective) || this.state.collective;
    this.setState({ Collective });
  }

  componentDidUpdate(oldProps) {
    // We store the component in state and update only if the next one is not
    // null because of a bug in Apollo where it strips the `Collective` from data
    // during re-hydratation.
    // See https://github.com/opencollective/opencollective/issues/1872
    const currentCollective = get(this.props, 'data.Collective');
    if (currentCollective && get(oldProps, 'data.Collective') !== currentCollective) {
      this.setState({ Collective: currentCollective });
    }
  }

  render() {
    const { LoggedInUser } = this.props;
    const collective = get(this.props, 'data.Collective') || this.state.Collective;

    if (!collective && this.props.data.loading) {
      return (
        <Page title="Transactions">
          <Loading />
        </Page>
      );
    } else if (!collective) {
      return <ErrorPage data={this.props.data} />;
    }

    return (
      <div className="TransactionsPage">
        <Header
          title={collective.name}
          description={collective.description}
          twitterHandle={collective.twitterHandle}
          image={collective.image || collective.backgroundImage}
          LoggedInUser={LoggedInUser}
        />

        <Body>
          <CollectiveCover
            collective={collective}
            href={`/${collective.slug}`}
            LoggedInUser={LoggedInUser}
            key={collective.slug}
            displayContributeLink={
              collective.isActive && collective.host && ['USER', 'ORGANIZATION'].indexOf(collective.type) === -1
            }
          />

          <div className="content">
            <TransactionsWithData
              collective={collective}
              LoggedInUser={LoggedInUser}
              showCSVlink={true}
              filters={true}
              dateDisplayType="date"
            />
          </div>
        </Body>

        <Footer />
      </div>
    );
  }
}

export default withUser(addCollectiveCoverData(TransactionsPage));
