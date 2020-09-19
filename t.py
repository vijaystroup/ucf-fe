# FE-May17-5.pdf
# FE-May17-Sol-5.pdf

question = 'FE-May17-5.pdf'
answer = question.split('.')[0]
answer = answer.split('-')
answer.append(answer[-1])
answer[-2] = 'Sol'
answer = '-'.join(answer)
print(answer)