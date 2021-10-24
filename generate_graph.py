import copy
import json

def main(*numbers):
    sets = [set([])]
    for n in numbers:
        sets.extend([s | {n} for s in sets])
    return sets

def create_subset(superset):
    mod_set = copy.deepcopy(superset)
    for cur_set in superset:
        if 'f' in cur_set and 'e' not in cur_set:
            mod_set.remove(cur_set)
        try:
            if "a" not in cur_set and len(cur_set) >= 1:
                mod_set.remove(cur_set)
        except ValueError:
            print("didn't ask")
    return mod_set

def build_graph(set_to_build):
    all_states = []
    for idx, subset in enumerate(set_to_build):
        neigh = []
        bef = []
        for inner_idx, potential_cand in enumerate(set_to_build):
            larger = True if len(potential_cand) > len(subset) else False

            if len(potential_cand.difference(subset)) == 1 and potential_cand.intersection(subset) == subset and larger:
                neigh.append(inner_idx)
            if len(subset.difference(potential_cand)) == 1 and potential_cand.intersection(subset) == potential_cand and not larger:
                bef.append(inner_idx)

        all_states.append(
            {'id': idx, 'self': list(subset), 'neighbors': neigh, "before": bef}
        )
    return all_states


def test_graph(graph):
    for item in graph:
        for n in item["neighbors"]:
            assert len(n) - len(item["self"]) == 1

graph = build_graph(create_subset(main('a', 'b', 'c', 'd', 'e', 'f')))
# test_graph(graph)

print(graph)
json.dump(graph, open("/home/byrdofafeather/ByrdOfAFeather/hack/ls.json", 'w'))
