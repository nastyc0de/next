import styled from '@emotion/styled';
import { Layout } from '../components/layout/Layout';

const Heading = styled.h1`
  color:red;
`
export default function Home() {
  return (
    <div>
      <Layout>
        <Heading>inicio de next</Heading>  
      </Layout>
    </div>
  )
}
