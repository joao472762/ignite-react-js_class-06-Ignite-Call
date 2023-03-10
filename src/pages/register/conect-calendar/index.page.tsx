import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";

import { Header } from "../components";

import { AuthError, ConenctCalendarContainer, ConnectArea, ConnectBox } from "./styles";

export default  function ConenctCalendar()  {
    const session = useSession()
    const router = useRouter()

    const hasError = !!router.query.error
    const UserIsLogged = session.status === 'authenticated'


    async function handleConnectCalendar(){
        await signIn('google')
    }
    async function handleNavigateToUpdteProfile(){
        router.push('/register/time-interval')
    }
    
    
   
    return (
        <>
            <NextSeo
                title="Conecte sua Agenda do Google| Ignite Call"
                noindex
            />
            <ConenctCalendarContainer>
                <Header>
                    <Heading>Conecte sua agenda!</Heading>
                    <Text>
                        Conecte o seu calendário para verificar automaticamente as horas 
                        ocupadas e os novos eventos à medida em que são agendados.
                    </Text>
                    <MultiStep size={4} currentStep={2}/>

                </Header>

                <ConnectBox as='main'>
                    <ConnectArea>
                        <Text>Google Calendar</Text>
                        {
                            UserIsLogged ? (
                                <Button size={"sm"} disabled variant={"secondary"} >Conectado <Check/> </Button>
                            ) :(
                            <Button 
                                variant={"secondary"}
                                onClick={handleConnectCalendar}
                            >
                                Conectar <ArrowRight/>
                            </Button>
                            )
                        }
                    </ConnectArea>

                    {
                        hasError && (
                            <AuthError> 
                                Falha ao conectar ao Google, veirifique se 
                                você habilitou as permissões de acesso ao Google Calendar
                            </AuthError>
                        )
                    }
                    
                    <Button 
                        disabled={!UserIsLogged}
                        onClick={handleNavigateToUpdteProfile}
                    >  
                        Próximo passo <ArrowRight/> 
                    </Button>
                    
                </ConnectBox>


            </ConenctCalendarContainer>
        </>
    )
}