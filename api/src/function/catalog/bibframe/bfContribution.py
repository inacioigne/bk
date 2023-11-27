def MakeContribution(contributions): 
        listContributions = list()
        for i in contributions:
                c = f"""[ a bf:Contribution;
                bf:agent <{i.agent}> ;
                bf:role <{i.role}> ]"""
                listContributions.append(c)
        contribution = ", ".join(listContributions)
        contribution = f"bf:contribution {contribution} ;"

        return contribution

# def MakeContribution(contributions): 
#         listContributions = list()
#         for i in contributions:
#                 c = f"""[ a bf:Contribution, { ", ".join( [f'<{i}>' for i in i.type]) } ;
#                 bf:agent <{i.agent}> ;
#                 bf:role <{i.role}> ]"""
#                 listContributions.append(c)
#         contribution = ", ".join(listContributions)
#         contribution = f"bf:contribution {contribution} ;"

#         return contribution