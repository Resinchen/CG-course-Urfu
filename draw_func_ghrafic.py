from math import *
from tkinter import *


screen_width = 700
screen_height = 600

is_show_X_axis = True
is_show_Y_axis = True

# входные данные
a = -10
b = 10
func = lambda x: sin(x)+cos(x/2)

# доп. переменные
x0 = 0
ymin = ymax = y0 = func(a)
axis_y_x = axis_x_y = 0

# будем ли рисовать вертикльную ось
if a > 0 and b > 0 or a < 0 and b < 0:
    is_show_Y_axis = False
    print('Not show Y_axis')

root = Tk()
root.geometry('650x650')
canvas = Canvas(root, width=screen_width, height=screen_height+10, bg="white")
canvas.pack(side=LEFT)

# ищем минимум и максимум функции
for xx in range(screen_width):
    x = a + xx * (b - a) / screen_width
    y = func(x)
    if y < ymin:
        ymin = y
    if y > ymax:
        ymax = y

# будем ли рисовать горизонтальную  ось
if ymin > 0 or ymax < 0:
    is_show_X_axis = False
    print('Not show X_axis')

# рисуем график
for x_scaled in range(screen_width):
    x = a + x_scaled * (b - a) / screen_width
    y = func(x)
    y_scaled = (y - ymax) * screen_height / (ymin - ymax) + 5

    if y > 0 and axis_y_x < y_scaled:
        axis_y_x = y_scaled
    if x == 0:
        axis_x_y = x_scaled
    
    # рисуем график
    canvas.create_line(x0, y0, x_scaled, y_scaled)

    x0 = x_scaled
    y0 = y_scaled

# рисуем оси
if is_show_Y_axis:
    canvas.create_line(axis_x_y, screen_height, axis_x_y, 0, width=1, arrow=LAST)

if is_show_X_axis:
    canvas.create_line(0, axis_y_x, screen_width, axis_y_x, width=1, arrow=LAST)

root.mainloop()
