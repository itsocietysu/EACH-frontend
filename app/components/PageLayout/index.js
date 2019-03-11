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
  headerProps,
  componentProps,
}) {
  return (
    <Wrapper>
      {Header && <Header {...headerProps} />}
      <Component {...componentProps} />
      {Footer && <Footer />}
    </Wrapper>
  );
}

PageLayout.propTypes = {
  header: PropTypes.func,
  component: PropTypes.func.isRequired,
  footer: PropTypes.func,
  headerProps: PropTypes.object,
  componentProps: PropTypes.object,
};

export default PageLayout;
