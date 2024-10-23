from flask_cors import CORS
from flask import Flask,request,jsonify
import pickle
import numpy as np
import pandas 

path = '.' #for local host

# path = 'home/LalithAdavi/mysite/res' #for pythonanywhere deployment

pt = pickle.load(open(path + '/res/pt.pkl','rb'))
books = pickle.load(open(path + '/res/comp_books.pkl','rb'))
scores = pickle.load(open(path + '/res/scores.pkl','rb'))


app = Flask(__name__)
cors = CORS(app,resources={r'/*':{'origin':'*'}})


@app.route('/')
def index_ui():
    return jsonify('welcome'),200

@app.route('/top50_api')
def top50_api():
    x=books.sort_values(by='avg_rating',ascending=False)
    data =  [
                           list(x['Book-Title'].values),
                           list(x['Book-Author'].values),
                           list(x['Image-URL-L'].values),
                           list(x['num_ratings'].values),
                           list(format(i,".2f") for i in x['avg_rating'].values)
    ]
    res = []
    for i in range(50):
        res.append({'Book-title':str(data[0][i]),
                    'Book-author':str(data[1][i]),
                    'Image-URL-M':str(data[2][i]),
                    'num_ratings':str(data[3][i]),
                    'avg_ratings':str(data[4][i]),
                    })
    return jsonify(res),200

@app.route('/reccomendations_api',methods=['post'])
def reccomendations_api():
    book_name=request.json['name']
    if len(np.where(pt.index==book_name)[0])==0:
        return jsonify({'status':0,'books':[]}),200
    
    idx = np.where(pt.index==book_name)[0][0]
    items = sorted(list(enumerate(scores[idx])),key = lambda x:x[1],reverse=True)[1:20]
    data=[]
    
    for i in items:            
        item=[]
        temp = books[books['Book-Title']==pt.index[i[0]]]
        item.extend(list(temp.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp.drop_duplicates('Book-Title')['Book-Author'].values))       
        item.extend(list(temp.drop_duplicates('Book-Title')['Image-URL-L'].values))
        item.extend(list(temp.drop_duplicates('Book-Title')['num_ratings'].values.astype('str')))
        item.extend(list(temp.drop_duplicates('Book-Title')['avg_rating'].values.astype('str')))
        data.append(item)
    res = []
    # return jsonify(data),200
    for i in data:
        if len(i)==0:
            continue
        res.append({'Book-title':i[0],
                    'Book-author':i[1],
                    'Image-URL-M':i[2],
                    'num_ratings':i[3],
                    'avg_rating': i[4]
                    })
        data=data[:10]
    return jsonify({'status':1,'books':res}),200

@app.route('/book_names')
def book_names_api():
    return jsonify({'BookNames': list(books['Book-Title'])}),200

# comment below code for pythonanywhere deployment
if __name__ == '__main__':
    app.run(debug=True)
