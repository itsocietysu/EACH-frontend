import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function PageLayout({
  header: Header,
  component: Component,
  footer: Footer,
  ...props
}) {
  return (
    <Wrapper>
      {Header && <Header />}
      <Component {...props} />
      {Footer && <Footer />}
    </Wrapper>
  );
}

PageLayout.propTypes = {
  header: PropTypes.func,
  component: PropTypes.func.isRequired,
  footer: PropTypes.func,
};

export default PageLayout;
