import styled from '@emotion/styled';

export const Forms = styled.form`
    max-width: 600px;
    width:95%;
    margin: 5rem auto 0 auto;
`;

export const Field =styled.div`
    margin-bottom: 2rem;
    display:flex;
    align-items:center;

    label{
        flex:0 0 150px;
        font-size:1.8rem;
    }
    input{
        flex:1;
        padding:1rem;
    }
`;
export const InputSubmit = styled.button`
    background-color:var(--primary);
    width:100%;
    padding:1.5rem;
    text-align:center;
    color:#FFF;
    font-size:1.8rem;
    text-transform:uppercase;
    border:none;
    font-family: 'Red Rose', cursive;
    font-weight:700;

    &:hover{
        cursor:pointer;
        background-color:var(--second);
    }
`;

export const Error = styled.p`
    background-color:red;
    padding:1rem;
    font-family:'Red Rose', cursive;
    font-weight:700;
    font-size:1.4rem;
    color:#fff;
    text-align: center;
    text-transform: uppercase;
    margin: 2 rem 0;
`;