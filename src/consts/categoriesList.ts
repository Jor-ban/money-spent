export interface ICategory {
  title: string
  codename: string
  color: string
}

export const categoriesList: ICategory[] = [
  {
    title: 'Еда и питье',
    codename: 'food',
    color: '#55ce55',
  },
  {
    title: 'Транспорт (бензин)',
    codename: 'transport',
    color: '#5597ec',
  },
  {
    title: 'Бытовые траты',
    codename: 'home',
    color: '#f8bb48',
  },
  {
    title: 'Подписки',
    codename: 'subscribtions',
    color: '#ff4242',
  },
  {
    title: 'Одежда и акксесуары',
    codename: 'clothes',
    color: '#b564f7',
  },
  {
    title: 'Срочные траты',
    codename: 'nessesary',
    color: '#000000',
  },
  {
    title: 'Покупка девайсов',
    codename: 'devices',
    color: '#53ffd4',
  },
  {
    title: 'Интернет покупки',
    codename: 'internet',
    color: '#a52a2a',
  },
  {
    title: 'Дано в долг',
    codename: 'lend',
    color: '#ffff00',
  },
  {
    title: 'Инвестиции (покупка валюты)',
    codename: 'investments',
    color: '#eeeeee',
  },
  {
    title: 'Без категории',
    codename: 'no-category',
    color: '#777777',
  },
]
