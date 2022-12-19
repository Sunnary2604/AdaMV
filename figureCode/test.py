from elopy import *

def main(index):
    input_dir = f'C:\\Users\\11058\\Desktop\\EloPy\\vote_gt\\vote{index}.txt'
    with open(input_dir, "r") as f:
        a = 'Our'
        b = 'GT'
        i = Implementation()
        i.addPlayer(a)
        i.addPlayer(b)
        for line in f.readlines():
            line = line.strip('\n')  #去掉列表中每一个元素的换行符
            if line == '1':
                i.recordMatch(a,b,winner=a)
            elif line == '2':
                i.recordMatch(a,b,winner=b)
            elif line == '3':
                i.recordMatch(a,b,draw=True)
        print(i.getRatingList())
if __name__ == '__main__':
    main(1)