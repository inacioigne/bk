interface Props {
    id: string
    mainTitle: string;
    subtitle: string | boolean;
  }

export default function GetTitle(params: Props) {
    let title = params?.subtitle ? `${params.mainTitle} ${params.subtitle}#${params.id}` : `${params.mainTitle}#${params.id}`;
    // console.log("P:", params)
    return title
    // 
  }