from src.schemas.settings import Settings

settings = Settings()

def MakeCreateSparql(graph, identifiedBy):
    graph = graph.split("\n\n")
    graph = "\n\n".join(graph[1:])

    graph = f"""
        PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>  
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        INSERT DATA {{
            GRAPH <{settings.base_url}/works/{identifiedBy}> 
            {{
                {graph} }} }} """

    return graph