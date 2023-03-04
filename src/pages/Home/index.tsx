import Image from "next/image";
import { NextSeo } from "next-seo";
import { Heading, Text } from "@ignite-ui/react";
import { Hero, HomeContainer, Preview} from "./styles";

import previewImage from '../../assets/previewImage.png'
import { ClaimUserNameForm } from "./components/ClaimUserNameForm";

export default function Home(){
  return (
    <>
     <NextSeo
        title="Descomplique a sua agenda | Ignite Call"
        description=" Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
     />
      <HomeContainer>
        <Hero>
          <Heading size={"4xl"}>
            Agendamento {'\n'} 
            descomplicado
          </Heading>
          <Text size={'xl'}>
            Conecte seu calendário e permita que as{'\n'}
            pessoas marquem agendamentos no seu tempo livre.
          </Text>
          <ClaimUserNameForm/>

        </Hero>
        <Preview>
          <Image 
            alt="calendário simulando a aplicação em desenvolvimento" 
            src={previewImage}
            quality={100}
            priority 
          />
        </Preview>
      </HomeContainer>
     
    </>

  )
}