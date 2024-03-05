def MakeContribution(contributions): 
        listContributions = list()
        for i in contributions:
                c = f"""[ a bf:Contribution;
                bf:agent <{i.uri}> ;
                bf:role <{i.role}> ]"""
                listContributions.append(c)
        contribution = ", ".join(listContributions)
        contribution = f"bf:contribution {contribution} ;"

        return contribution