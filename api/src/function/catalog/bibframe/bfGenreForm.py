def MakeGenreForm(genreForm): 
        
        gF = f'bf:genreForm { ", ".join([f"<{i.genreForm}>" for i in genreForm ]) } ; '

        return gF