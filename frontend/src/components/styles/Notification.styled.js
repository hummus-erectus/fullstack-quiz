import styled from 'styled-components'

export const StyledNotification = styled.div`
    background: ${({ theme }) => theme.colors.baseHighlight || '#EFEAE6'};
    min-height: 55px;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    color: ${({ type }) => (type === 'success' ? 'green' : 'red')};

    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    animation: fadeIn 0.5s ease-in-out forwards;

    @keyframes fadeIn {
        0% {
            transform: translate(-50%, -100%);
        }
        100% {
            transform: translate(-50%, 0);
        }
    }
`