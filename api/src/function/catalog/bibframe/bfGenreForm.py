def MakeGenreForm(genreForm): 
        
        gF = f'bf:genreForm { ", ".join([f"<{i.uri}>" for i in genreForm ]) } ; '

        return gF