import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter} from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


const SUPABASE_ANONKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM2ODYzMCwiZXhwIjoxOTU4OTQ0NjMwfQ.GSC5VkEzwPoJ9QaepsInLJ_pFlA6MjnXjiNzPapw16M'
const SUPABASE_URL = 'https://ehqumhzyffilimnyclrh.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANONKEY);



export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    // Sua lógica vai aqui

    // ./Sua lógica vai aqui

    //Usuário
    /* 
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem

    //Dev
    - [X]Campo criado
    - [X]Vamos uar o onChange e o useState (ter if para caso seja enter limpar a variável)
    - Lista de mensagens
    */
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id',  {ascending: false })
            .then(({ data, })=> {
                setListaDeMensagens(data);
        });
    }, []);

    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado, 
            texto: novaMensagem

        };

        supabaseClient
        .from('mensagens')
        .insert([
            //Tem que ser um objeto com os MESMOS CAMPOS que eu escrevi no supabase
            mensagem
        ])
        .then(({data})=>{
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens, 
            ]);
        })


        setMensagem('');
    };

    
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {<MessageList mensagens={listaDeMensagens} />}
                    


                    
                 {/*    {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value
                                setMensagem(valor);
                            }}

                            onKeyPress={(event) => {
                                if(event.key === 'Enter') {
                                    event.preventDefault();
                                    console.log(event);

                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker />
                        <Button 
                            type='submit'
                            label='Enviar'
                            onClick={() => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                            styleSheet={{
                                width: '80px',
                                height: '48px',
                                borderRadius: '5px',
                                padding: '10px',
                                marginBottom: '9px',
                                backgroundColor: appConfig.theme.colors.primary[500]
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

   
    console.log('Mensagem',props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {

                function handleApagarMensagem (id)  {
                    /* const filteredMensagens = mensagem.filter(mensagem => mensagem.id !== id);
                    setMensagem(filteredMensagens); */
                    console.log('Entrou na função');
                };
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button 
                                label='X'
                                onClick={() => {
                                    handleApagarMensagem(mensagem.id);
                                }}
                                styleSheet={{
                                    height: '1em',
                                    textAlign: 'center',
                                }}
                            />
                            </Box>
                        {mensagem.texto}
                        
                    </Text>
                    
                )
            })}
        </Box>
    )
}