def MakeSubject(subjects): 
        
        subject = f"bf:subject { ', '.join([f'<{subject.uri}>' for subject in subjects]) } ;"

        return subject