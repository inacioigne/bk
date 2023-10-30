import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoWikidata() {
  return (
   <IconButton>
    <Image
      src="/logos/wikidata.png"
      width={16}
      height={16}
      alt="wikidata"
    />
   </IconButton>
  );
}