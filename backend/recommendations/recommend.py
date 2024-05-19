import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
from io import StringIO 


def generate_recommendations(user_preferences, restaurant_data):
    try:
        restaurant_data = json.loads(restaurant_data)
        df = pd.DataFrame(restaurant_data)

        df['text'] = df['keywords'].apply(lambda x: ' '.join(x))

        tfidf_vectorizer = TfidfVectorizer()
        tfidf_matrix = tfidf_vectorizer.fit_transform(df['text'])

        user_prefs_vector = tfidf_vectorizer.transform([user_preferences])
        sim_scores = cosine_similarity(user_prefs_vector, tfidf_matrix)

        restaurant_indices = sim_scores.argsort()[0][::-1]

        recommendations = df.iloc[restaurant_indices[:5]].to_dict(orient='records')
        return json.dumps(recommendations)
    except Exception as e:
        print("Error:", e)
        return None
    
if __name__ == "__main__":
    import sys
    user_preferences = sys.argv[1]
    restaurant_data = sys.argv[2]
    recommendations = generate_recommendations(user_preferences, restaurant_data)
    print(recommendations)
