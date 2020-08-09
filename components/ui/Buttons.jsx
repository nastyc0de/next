import styled from '@emotion/styled';

export const Buttons = styled.a`
    display:block;
    font-weight:700;
    text-transform:uppercase;
    border:2px solid var(--third);
    border-radius:20px;
    padding: .8rem 2rem;
    margin:2rem auto;
    text-align:center;
    background-color:${props =>props.bgColor ? 'transparent' : 'white'};
    color:${props => props.bgColor ? 'var(--third)':'white'};

    &:last-of-type{
        margin-right:0;
    }
    &:hover{
        cursor: pointer;
        border:2px solid var(--fifth);
        color:var(--fifth);
    }
`;