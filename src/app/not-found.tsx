import Link from 'next/link';
import Image from 'next/image';
import { Title, Button } from 'rizzui';
import { PiHouseLineBold } from 'react-icons/pi';
import SocialItems from '@/components/ui/social-shares';
import { siteConfig } from '@/config/site.config';
import cous from '@public/cous.png';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <div className="sticky top-0 z-40 flex justify-center py-5 backdrop-blur-lg lg:backdrop-blur-none xl:py-10">
        
      </div>

      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto text-center">
          <Image
            src={cous}
            alt="not found"
            className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[370px] lg:mb-12 2xl:mb-16"
          />
          <Title
            as="h1"
            className="text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
          >
            Page introuvable
          </Title>
         
           
          <Link href={'/'}>
            <Button
              as="span"
              size="xl"
              color="primary"
              className="mt-8 h-12 px-4 xl:h-14 xl:px-6"
              style={{
                backgroundColor: '#E30613', // Rose 300
                color: 'white'
              }}
            >
              <PiHouseLineBold className="mr-1.5 text-lg" />
              Retour à la page principale
            </Button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}